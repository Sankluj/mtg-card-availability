const pool = require('./db/index.js');

const getCardIdsByCardName = async cardName => {
  const { rows = [] } = await pool.query(`
    SELECT DID
    FROM CARDS
    WHERE LOWER(CARDS.NAME) LIKE $1
  `, [ `%${cardName.toLowerCase()}%` ]);

  return rows.map(({ did }) => did);
};

const getAvailabilityByCardName = async cardName => {
  const cardIds = await getCardIdsByCardName(cardName);

  if (cardIds.length <= 0) {
    throw {
      errorCode: 404,
      errorMessage: 'No cards found with this name'
    };
  }

  const { rows } = await pool.query(`
    SELECT
      MAGICIANS.NAME AS MAGICIAN_NAME,
      CARDS.DID AS CARD_ID,
      CARDS.NAME AS CARD_NAME,
      CARDS_TO_MAGICIANS.AMOUNT
    FROM CARDS_TO_MAGICIANS
      INNER JOIN CARDS ON CARDS.DID = CARDS_TO_MAGICIANS.CARD_DID
      INNER JOIN MAGICIANS ON MAGICIANS.DID = CARDS_TO_MAGICIANS.MAGICIAN_DID
    WHERE CARDS.DID IN (${cardIds.join(',')})

  `);

  const availability = rows.reduce((acc, {
    magician_name: magicianName,
    card_id: cardId,
    card_name: cardName,
    amount,
  }) => {
    const index = acc.findIndex(({ cardId: id }) => cardId === id);

    return index > -1 ?
      (acc[index].amount[magicianName] = amount) && acc :
      [
        ...acc,
        {
          cardId,
          cardName,
          amount: {
            [magicianName]: amount
          }
        }
      ];
  }, []);

  return availability;
};

module.exports = {
  getAvailabilityByCardName,
};
