CREATE TABLE users (
  ID SERIAL PRIMARY KEY,
  name VARCHAR(50),
  email VARCHAR(30),
  profession VARCHAR(30),
  age NUMERIC (3),
  location VARCHAR(30)
);
INSERT INTO users (name, email,profession,age,location)
  VALUES ('George', 'george@example.com', 'Software Engineer', 27, 'Germany'), ('Diana', 'diana@example.com', 'Product Manager', 30, 'Germany'), ('Andrew', 'andrew@example.com', 'Software Engineer', 37, 'France'),('Jerry', 'jerry@example.com', 'Doctor', 35, 'USA'),('Diana', 'diana1@example.com', 'Software Engineer', 23, 'UK'), ('Mary', 'mary@example.com', 'CFO', 45, 'Germany'), ('Taylor', 'taylor@example.com', 'Teacher', 57, 'USA'),('John', 'john@example.com', 'Personal Trainer', 32, 'USA');
SELECT * FROM users