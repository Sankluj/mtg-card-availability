const pool = require('./src/db/index.js');
const { send } = require('micro');

module.exports = async (req, res) => {
  try {
    const { rows } = await pool.query('SELECT NOW()');
    send(res, 200, rows);
  } catch (e) {
    console.log(e);
    res.end('Error');
  }
};
