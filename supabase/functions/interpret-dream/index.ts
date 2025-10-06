import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const GROQ_API_KEY = Deno.env.get('GROQ_API_KEY');
const GROQ_API_ENDPOINT = 'https://api.groq.com/openai/v1/chat/completions';

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface DreamRequest {
  dreamText: string;
}

interface DreamInterpretation {
  summary: string;
  themes: Theme[];
  symbols: Symbol[];
  emotions: Emotion[];
  insights: string[];
  lucidDreamPotential: number;
}

interface Theme {
  name: string;
  description: string;
  intensity: number;
}

interface Symbol {
  name: string;
  meaning: string;
  category: string;
  color: string;
}

interface Emotion {
  name: string;
  intensity: number;
  color: string;
}

interface VisualData {
  themeDistribution: { name: string; value: number; color: string }[];
  emotionalSpectrum: { emotion: string; value: number; color: string }[];
  symbolMap: { symbol: string; size: number; x: number; y: number; color: string }[];
  lucidScore: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { dreamText }: DreamRequest = await req.json();

    if (!dreamText || dreamText.trim().length === 0) {
      return new Response(
        JSON.stringify({ error: 'Dream text is required' }),
        {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    if (!GROQ_API_KEY) {
      console.error('GROQ_API_KEY is not set');
      return new Response(
        JSON.stringify({ 
          interpretation: generateFallbackInterpretation(dreamText).interpretation,
          visualData: generateFallbackInterpretation(dreamText).visualData,
          usedFallback: true
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const prompt = `You are an expert dream analyst. Analyze the following dream and provide a detailed interpretation in JSON format.

Dream: "${dreamText}"

Return ONLY valid JSON (no markdown, no code blocks) with this exact structure:
{
  "summary": "A brief 2-3 sentence summary of the dream's core meaning",
  "themes": [
    {"name": "theme name", "description": "brief description", "intensity": 0-100}
  ],
  "symbols": [
    {"name": "symbol", "meaning": "what it represents", "category": "nature/people/objects/abstract", "color": "#hex"}
  ],
  "emotions": [
    {"name": "emotion", "intensity": 0-100, "color": "#hex"}
  ],
  "insights": ["insight 1", "insight 2", "insight 3"],
  "lucidDreamPotential": 0-100
}

Include 3-5 themes, 5-8 symbols, 3-5 emotions, and 3-5 insights. Use vibrant hex colors for visualization.`;

    const response = await fetch(GROQ_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'llama-3.3-70b-versatile',
        messages: [
          {
            role: 'system',
            content: 'You are a dream interpretation expert. Always respond with valid JSON only, no markdown formatting.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: 0.7,
        max_tokens: 2000,
      }),
    });

    if (!response.ok) {
      console.error('Groq API error:', response.statusText);
      const fallback = generateFallbackInterpretation(dreamText);
      return new Response(
        JSON.stringify({ 
          interpretation: fallback.interpretation,
          visualData: fallback.visualData,
          usedFallback: true
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    const data = await response.json();
    const content = data.choices[0]?.message?.content || '';

    const cleanedContent = content.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
    const interpretation: DreamInterpretation = JSON.parse(cleanedContent);

    const visualData = generateVisualData(interpretation);

    return new Response(
      JSON.stringify({ interpretation, visualData, usedFallback: false }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    console.error('Error processing dream:', error);
    
    try {
      const { dreamText } = await req.json();
      const fallback = generateFallbackInterpretation(dreamText);
      return new Response(
        JSON.stringify({ 
          interpretation: fallback.interpretation,
          visualData: fallback.visualData,
          usedFallback: true
        }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    } catch {
      return new Response(
        JSON.stringify({ error: 'Failed to process dream interpretation' }),
        {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }
  }
});

function generateVisualData(interpretation: DreamInterpretation): VisualData {
  const themeDistribution = interpretation.themes.map(theme => ({
    name: theme.name,
    value: theme.intensity,
    color: generateColorForTheme(theme.name),
  }));

  const emotionalSpectrum = interpretation.emotions.map(emotion => ({
    emotion: emotion.name,
    value: emotion.intensity,
    color: emotion.color,
  }));

  const symbolMap = interpretation.symbols.map((symbol, index) => {
    const angle = (index / interpretation.symbols.length) * 2 * Math.PI;
    const radius = 40 + Math.random() * 20;
    return {
      symbol: symbol.name,
      size: 20 + Math.random() * 30,
      x: 50 + Math.cos(angle) * radius,
      y: 50 + Math.sin(angle) * radius,
      color: symbol.color,
    };
  });

  return {
    themeDistribution,
    emotionalSpectrum,
    symbolMap,
    lucidScore: interpretation.lucidDreamPotential,
  };
}

function generateColorForTheme(themeName: string): string {
  const colors: Record<string, string> = {
    'adventure': '#FF6B6B',
    'fear': '#4A148C',
    'love': '#EC407A',
    'transformation': '#26A69A',
    'conflict': '#D32F2F',
    'journey': '#FFA726',
    'mystery': '#5E35B1',
    'growth': '#66BB6A',
    'loss': '#607D8B',
    'discovery': '#42A5F5',
  };

  const lowerTheme = themeName.toLowerCase();
  for (const [key, color] of Object.entries(colors)) {
    if (lowerTheme.includes(key)) return color;
  }

  const hue = Math.abs(hashString(themeName)) % 360;
  return `hsl(${hue}, 70%, 60%)`;
}

function hashString(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = ((hash << 5) - hash) + str.charCodeAt(i);
    hash = hash & hash;
  }
  return hash;
}

function generateFallbackInterpretation(dreamText: string): { interpretation: DreamInterpretation; visualData: VisualData } {
  const interpretation: DreamInterpretation = {
    summary: "Your dream contains rich symbolism and emotional depth. It reflects your subconscious processing daily experiences and deeper life themes.",
    themes: [
      { name: "Exploration", description: "A journey through the unknown", intensity: 75 },
      { name: "Emotion", description: "Deep feelings surfacing", intensity: 65 },
      { name: "Transformation", description: "Personal growth and change", intensity: 80 },
    ],
    symbols: [
      { name: "Water", meaning: "Emotions and the unconscious", category: "nature", color: "#2196F3" },
      { name: "Path", meaning: "Life's journey and choices", category: "abstract", color: "#795548" },
      { name: "Light", meaning: "Clarity and awareness", category: "abstract", color: "#FFC107" },
      { name: "Animal", meaning: "Instincts and natural self", category: "nature", color: "#4CAF50" },
      { name: "House", meaning: "The self and personal space", category: "objects", color: "#FF5722" },
    ],
    emotions: [
      { name: "Wonder", intensity: 70, color: "#9C27B0" },
      { name: "Curiosity", intensity: 85, color: "#00BCD4" },
      { name: "Peace", intensity: 60, color: "#4CAF50" },
    ],
    insights: [
      "This dream reflects your current life transitions and emotional state",
      "Recurring symbols suggest themes that deserve your attention",
      "The dream's atmosphere reveals your subconscious feelings about current situations",
    ],
    lucidDreamPotential: 65,
  };

  const visualData = generateVisualData(interpretation);
  return { interpretation, visualData };
}