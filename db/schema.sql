-- Drop the database if it exists
DROP DATABASE IF EXISTS tech_blog_db;

-- Create a new database
CREATE DATABASE tech_blog_db;

ALTER TABLE post ADD COLUMN created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP;

