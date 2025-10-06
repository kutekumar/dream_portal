import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Dream {
  id: string;
  dream_text: string;
  audio_url?: string;
  interpretation?: DreamInterpretation;
  visual_data?: VisualData;
  created_at: string;
  session_id: string;
}

export interface DreamInterpretation {
  summary: string;
  themes: Theme[];
  symbols: Symbol[];
  emotions: Emotion[];
  insights: string[];
  lucidDreamPotential: number;
}

export interface Theme {
  name: string;
  description: string;
  intensity: number;
}

export interface Symbol {
  name: string;
  meaning: string;
  category: string;
  color: string;
}

export interface Emotion {
  name: string;
  intensity: number;
  color: string;
}

export interface VisualData {
  themeDistribution: { name: string; value: number; color: string }[];
  emotionalSpectrum: { emotion: string; value: number; color: string }[];
  symbolMap: { symbol: string; size: number; x: number; y: number; color: string }[];
  lucidScore: number;
}
