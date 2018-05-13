const pool = require('./db/index.js');

const getCardIdByCardName = async cardName => {
  const { rows: [ { did: cardId } ] } = await pool.query(`
    SELECT DID
    FROM CARDS
    WHERE CARDS.NAME LIKE $1
  `, [ `%${cardName}%` ]);

  return cardId;
};

const getAvailabilityByCardName = async cardName => {
  const cardId = await getCardIdByCardName(cardName);

  const { rows } = await pool.query(`
    SELECT
      MAGICIANS.NAME AS MAGICIAN_NAME,
      CARDS.NAME AS CARD_NAME,
      CARDS_TO_MAGICIANS.AMOUNT
    FROM CARDS_TO_MAGICIANS
      INNER JOIN CARDS ON CARDS.DID = CARDS_TO_MAGICIANS.CARD_DID
      INNER JOIN MAGICIANS ON MAGICIANS.DID = CARDS_TO_MAGICIANS.MAGICIAN_DID
    WHERE CARDS.DID = $1
  `, [ cardId ]);

  return rows;
};

module.exports = {
  getAvailabilityByCardName,
};
