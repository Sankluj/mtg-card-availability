CREATE TABLE MAGICIANS (
  did           SERIAL PRIMARY KEY,
  name          varchar(40) NOT NULL CHECK (name <> '')
);

CREATE TABLE CARDS (
  did           SERIAL PRIMARY KEY,
  set_code      varchar(40) NOT NULL CHECK (set_code <> ''),
  number        integer,
  name          varchar(40) NOT NULL CHECK (name <> '')
);

CREATE TABLE CARDS_TO_MAGICIANS (
  magician_did  integer REFERENCES MAGICIANS (did),
  card_did      integer REFERENCES CARDS (did),
  amount        integer,
  PRIMARY KEY (magician_did, card_did)
);
