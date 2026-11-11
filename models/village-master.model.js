// models/village.model.js
const db = require('../config/db');

class VillageModel {
    /**
     * Fetches matching districts from village_master table
     * @param {string} state - The state_key criteria
     * @param {string} lang - The language filter
     */
    static async findDistricts(lang) {
        const sql = `
      SELECT *
      FROM village_master 
      WHERE state_key = 'Rajasthan'
        AND language = 'English'
        AND status = '1' 
      ORDER BY district_key ASC
    `;

        // const [rows] = await db.logQuery(sql, [state, lang]);
        const [rows] = await db.query(sql, [lang]);

        // console.log(db.query(sql, [state, lang]))
        return rows;
    }
}

module.exports = VillageModel;