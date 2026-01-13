-- Create users table (extends Supabase auth.users)
CREATE TABLE IF NOT EXISTS users (
  id UUID REFERENCES auth.users(id) PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  name TEXT,
  photo_url TEXT,
  bio TEXT,
  location_lat FLOAT,
  location_lng FLOAT,
  neighborhood TEXT,
  pace_min INTEGER,
  pace_max INTEGER,
  preferred_distances TEXT[],
  strava_url TEXT,
  role TEXT NOT NULL DEFAULT 'runner' CHECK (role IN ('runner', 'coach')),
  stripe_account_id TEXT,
  stripe_onboarding_complete BOOLEAN DEFAULT false,
  has_insurance BOOLEAN DEFAULT false,
  certification TEXT,
  is_verified BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Create clubs table
CREATE TABLE IF NOT EXISTS clubs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  slug TEXT UNIQUE NOT NULL,
  description TEXT,
  location_lat FLOAT,
  location_lng FLOAT,
  neighborhood TEXT,
  schedule TEXT,
  website_url TEXT,
  instagram_url TEXT,
  source TEXT DEFAULT 'user_submitted' CHECK (source IN ('seeded', 'user_submitted', 'verified')),
  member_count INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE clubs ENABLE ROW LEVEL SECURITY;

-- Drop existing policies (in case they exist)
DO $$
BEGIN
  DROP POLICY IF EXISTS "Users can view all profiles" ON users;
  DROP POLICY IF EXISTS "Users can insert their own profile" ON users;
  DROP POLICY IF EXISTS "Users can update own profile" ON users;
  DROP POLICY IF EXISTS "Anyone can view approved clubs" ON clubs;
  DROP POLICY IF EXISTS "Authenticated users can insert clubs" ON clubs;
EXCEPTION
  WHEN undefined_table THEN NULL;
  WHEN undefined_object THEN NULL;
END $$;

-- Users policies
CREATE POLICY "Users can view all profiles"
  ON users FOR SELECT
  USING (true);

CREATE POLICY "Users can insert their own profile"
  ON users FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON users FOR UPDATE
  USING (auth.uid() = id);

-- Clubs policies
CREATE POLICY "Anyone can view approved clubs"
  ON clubs FOR SELECT
  USING (is_approved = true);

CREATE POLICY "Authenticated users can insert clubs"
  ON clubs FOR INSERT
  TO authenticated
  WITH CHECK (true);
