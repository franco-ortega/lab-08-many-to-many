DROP TABLE IF EXISTS trees;
-- DROP TABLE IF EXISTS birds CASCADE;
-- DROP TABLE IF EXISTS trees_birds;

CREATE TABLE trees (
    id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    tree_species TEXT NOT NULL,
    rings INTEGER CHECK (rings > 0)
);

-- CREATE TABLE birds (
--     id BIGINT GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
--     bird_species TEXT NOT NULL,
--     color TEXT NOT NULL
-- );

-- CREATE TABLE trees_birds (
--     tree_id BIGINT REFERENCES trees(id),
--     bird_id BIGINT REFERENCES birds(id)
-- );
