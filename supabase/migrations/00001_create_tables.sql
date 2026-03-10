-- Create Internships Table
CREATE TABLE internships (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  company TEXT NOT NULL,
  platform TEXT NOT NULL,
  location TEXT NOT NULL,
  stipend TEXT,
  deadline TIMESTAMPTZ,
  description TEXT,
  apply_url TEXT NOT NULL,
  source_id TEXT UNIQUE NOT NULL,
  is_active BOOLEAN DEFAULT true,
  category TEXT,
  remote BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Daily Posts Table
CREATE TABLE daily_posts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  post_date DATE UNIQUE NOT NULL,
  title TEXT NOT NULL,
  content TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Create Bookmarks Table
CREATE TABLE bookmarks (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL, -- Assuming integration with Supabase Auth in the future
  internship_id UUID REFERENCES internships(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, internship_id)
);

-- Indexes for performance
CREATE INDEX idx_internships_active ON internships(is_active);
CREATE INDEX idx_internships_platform ON internships(platform);
CREATE INDEX idx_internships_location ON internships(location);
CREATE INDEX idx_internships_remote ON internships(remote);
CREATE INDEX idx_internships_category ON internships(category);
CREATE INDEX idx_internships_deadline ON internships(deadline);
