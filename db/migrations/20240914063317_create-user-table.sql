-- migrate:up
CREATE TABLE public.user(
  id SERIAL PRIMARY KEY,
  name TEXT, 
  email TEXT UNIQUE
);

-- migrate:down
DROP TABLE public.user;

