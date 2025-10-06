import type { DreamInterpretation, VisualData } from './supabase';

const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY;

export async function interpretDream(dreamText: string): Promise<{ interpretation: DreamInterpretation; visualData: VisualData }> {
  const apiUrl = `${SUPABASE_URL}/functions/v1/interpret-dream`;

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ dreamText }),
    });

    if (!response.ok) {
      throw new Error(`API request failed: ${response.statusText}`);
    }

    const data = await response.json();
    return {
      interpretation: data.interpretation,
      visualData: data.visualData,
    };
  } catch (error) {
    console.error('Dream interpretation error:', error);
    throw error;
  }
}
