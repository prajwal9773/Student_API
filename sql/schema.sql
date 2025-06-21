-- Create table for students
CREATE TABLE IF NOT EXISTS students (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  course VARCHAR(100) NOT NULL,
  year INTEGER NOT NULL
);


CREATE INDEX IF NOT EXISTS idx_students_course ON students(course);

CREATE INDEX IF NOT EXISTS idx_students_year ON students(year);

CREATE INDEX IF NOT EXISTS idx_students_name_lower ON students(LOWER(name));
