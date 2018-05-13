INSERT INTO MAGICIANS (name) VALUES
  ('Matthieu'),
  ('Adrien'),
  ('Romeo');

INSERT INTO CARDS (set_code, number, name) VALUES
  ('DOM', 207, 'Teferi, Hero of Dominaria'),
  ('DOM', 200, 'Oath of Teferi'),
  ('DOM', 132, 'Jaya Ballard'),
  ('XLN', 22, 'Legion''s Landing');

INSERT INTO CARDS_TO_MAGICIANS (magician_did, card_did, amount) VALUES
  (1, 1, 3),
  (1, 2, 1),
  (2, 1, 1),
  (2, 4, 4),
  (3, 3, 1);
