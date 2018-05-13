const { send } = require('micro');
const query = require('micro-query');

const { getAvailabilityByCardName } = require('./src/index.js');

module.exports = async (req, res) => {
  const { cardName } = query(req);

  try {
    if (!cardName) {
      throw {
        errorCode: 400,
        errorMessage: 'No card name provided'
      };
    }

    const availability = await getAvailabilityByCardName(cardName);

    return send(res, 200, availability);
  } catch ({ errorCode = 500, errorMessage }) {
    return send(res, errorCode, { errorCode, errorMessage });
  }
};
