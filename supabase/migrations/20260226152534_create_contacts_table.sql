/*
  # Create contacts table

  1. New Tables
    - `contacts`
      - `id` (uuid, primary key) - Unique identifier for each contact
      - `name` (text) - Contact person name
      - `email` (text) - Contact email address
      - `phone` (text, optional) - Contact phone number
      - `project_type` (text) - Type of project requested
      - `message` (text) - Contact message
      - `status` (text) - Status of the contact (new, read, replied)
      - `created_at` (timestamptz) - Timestamp when contact was created
  
  2. Security
    - Enable RLS on `contacts` table
    - Add policy for anonymous users to insert contacts
    - Add policy for authenticated users to view all contacts (admin)
*/

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  email text NOT NULL,
  phone text,
  project_type text NOT NULL,
  message text NOT NULL,
  status text DEFAULT 'new',
  created_at timestamptz DEFAULT now()
);

ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can submit contact form"
  ON contacts
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Authenticated users can view all contacts"
  ON contacts
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Authenticated users can update contacts"
  ON contacts
  FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);