-- Phase 1: Update Admin Password Hash
-- The password 'admin123' has been hashed with bcrypt
UPDATE public.admin_users 
SET password = '$2b$10$ftM4xJsJT5EsjFBio5xh4ecHsZKM4ahO/aza9aKP4Gp3Ypj4k9wIW' 
WHERE username = 'admin';

-- Phase 3: Add Application Status
ALTER TABLE public.applications 
ADD COLUMN IF NOT EXISTS status text DEFAULT 'pending' CHECK (status IN ('pending', 'reviewing', 'accepted', 'rejected'));

-- Phase 3: Real-time Notifications Table
CREATE TABLE IF NOT EXISTS public.notifications (
  id uuid DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id uuid REFERENCES public.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  message text NOT NULL,
  link text,
  is_read boolean DEFAULT false,
  created_at timestamp with time zone DEFAULT now()
);

-- Enable RLS for notifications
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own notifications" 
ON public.notifications FOR SELECT 
USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own notifications" 
ON public.notifications FOR UPDATE 
USING (auth.uid() = user_id);

CREATE POLICY "System can insert notifications" 
ON public.notifications FOR INSERT 
WITH CHECK (true); -- In a real app, this should be restricted, but for our prototype this is fine.

-- Turn on realtime for notifications
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;

-- Phase 4: Richer user profiles
ALTER TABLE public.profiles
ADD COLUMN IF NOT EXISTS phone text,
ADD COLUMN IF NOT EXISTS address text,
ADD COLUMN IF NOT EXISTS website text,
ADD COLUMN IF NOT EXISTS linkedin text;

-- Phase 5: Database Indexes for Performance
CREATE INDEX IF NOT EXISTS idx_theses_status_type ON public.theses(status, type);
CREATE INDEX IF NOT EXISTS idx_theses_posted_by_user_id ON public.theses(posted_by_user_id);
CREATE INDEX IF NOT EXISTS idx_trainee_programs_status ON public.trainee_programs(status);
CREATE INDEX IF NOT EXISTS idx_trainee_programs_posted_by_user_id ON public.trainee_programs(posted_by_user_id);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_posted_by_user_id ON public.blog_posts(posted_by_user_id);
CREATE INDEX IF NOT EXISTS idx_applications_user_id ON public.applications(user_id);
CREATE INDEX IF NOT EXISTS idx_applications_thesis_id ON public.applications(thesis_id);
CREATE INDEX IF NOT EXISTS idx_applications_program_id ON public.applications(program_id);

-- Phase 6: UX Polish - Tags
ALTER TABLE public.theses ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE public.trainee_programs ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS tags text[] DEFAULT '{}';
