
CREATE TABLE IF NOT EXISTS poker.roles (
    id integer DEFAULT nextval('poker.roles_id_seq'::regclass) PRIMARY KEY,
    name text NOT NULL
);

INSERT INTO poker.roles (name)
VALUES ('user'), ('admin');

CREATE TABLE poker.users (
    id integer DEFAULT nextval('poker.users_id_seq'::regclass) PRIMARY KEY,
    email character varying(255) UNIQUE,
    first character varying(150) NOT NULL,
    last character varying(150) NOT NULL,
    role integer REFERENCES poker.roles(id)
);

CREATE TABLE IF NOT EXISTS poker.users_auth (
    id integer DEFAULT nextval('poker.users_auth_id_seq'::regclass) PRIMARY KEY,
    users_id integer REFERENCES poker.users(id),
    hash text NOT NULL
);


