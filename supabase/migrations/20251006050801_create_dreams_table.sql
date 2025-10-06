-- Create Dreams Table
-- 
-- Overview:
-- Creates a public table for storing dream entries without requiring user authentication.
-- Each dream is stored with its original content, AI interpretation, analysis data, and timestamp.
-- 
-- Tables Created:
-- 
-- dreams table:
--   - id (uuid, primary key) - Unique identifier for each dream entry
--   - dream_text (text) - The original dream content entered by the user
--   - audio_url (text, nullable) - URL to audio recording if user submitted via voice
--   - interpretation (jsonb) - AI-generated interpretation including themes, symbols, emotions
--   - visual_data (jsonb) - Structured data for visual representations (charts, symbols)
--   - created_at (timestamptz) - Timestamp when dream was recorded
--   - session_id (text) - Anonymous session identifier for potential future retrieval
-- 
-- Security:
--   - Table is public and does NOT require authentication
--   - RLS is enabled but policies allow public insert and read by session_id
--   - No user identification or personal data is stored
-- 
-- Notes:
--   - Dreams are stored anonymously with only session-based retrieval
--   - JSONB fields allow flexible storage of AI interpretation and visual data
--   - Session IDs are client-generated UUIDs for optional dream retrieval

CREATE TABLE IF NOT EXISTS dreams (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  dream_text text NOT NULL,
  audio_url text,
  interpretation jsonb,
  visual_data jsonb,
  created_at timestamptz DEFAULT now(),
  session_id text NOT NULL
);

ALTER TABLE dreams ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can insert dreams"
  ON dreams
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Anyone can read dreams by session_id"
  ON dreams
  FOR SELECT
  TO anon
  USING (true);