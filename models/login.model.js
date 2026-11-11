// models/village.model.js
const db = require('../config/db');

class loginModelAuthentication {
  
  static async login(username, password) {
    const sql = `Select user_id,USER_ROLE, STATE,show_summary,district from web_user_master where USER_NAME = ? and status='1'`;

    // const [rows] = await db.logQuery(sql, [state, lang]);
    const [rows] = await db.query(sql, [username]);

    // console.log(db.query(sql, [state, lang]))
    // console.log('==rows', rows)
    return rows;
  }
}

module.exports = loginModelAuthentication;