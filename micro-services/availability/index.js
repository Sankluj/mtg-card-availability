const { send } = require('micro');

const { getAvailabilityByCardName } = require('./src/index.js');

module.exports = async (req, res) => {
  try {
    const availability = await getAvailabilityByCardName('Teferi');
    send(res, 200, availability);
  } catch (e) {
    console.log(e);
    res.end('Error');
  }
};
