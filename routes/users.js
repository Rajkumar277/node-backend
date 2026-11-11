var express = require('express');
var router = express.Router();

const db = require('../config/db'); // Import the database pool
const LoginController = require('../controllers/login.controller.js');

/* GET users listing. */
router.get('/webUsers', async function (req, res, next) {
  try {
    // Execute query using connection pool safely
    const [rows] = await db.query('SELECT * FROM web_user_master');
    
    // Respond back with query payload data
    res.status(200).json({
      success: true,
      data: rows, count: rows.length
    });
    console.log('Response--', {
      success: true,
      data: rows, count: rows.length
    })
  } catch (error) {
    // Forward database exceptions straight to error handler middleware
    next(error);
  }
});


router.post('/webUsersPerRole', async function (req, res, next) {
  try {
    // Front-end-la irundhu varra role-ai edukirom
    const { userRole } = req.body; 

    let query = 'SELECT * FROM web_user_master';
    let queryParams = [];

    // Oru vaelai userRole anuppirundha mattum filter pandrom
    if (userRole) {
      query += ' WHERE USER_ROLE = ?';
      queryParams.push(userRole);
    }

    // Execute query using connection pool safely with params
    const [rows] = await db.query(query, queryParams);
    
    // Respond back with query payload data
    res.status(200).json({
      success: true,
      data: rows, 
      count: rows.length
    });

    console.log('Response for role:', userRole, '--', rows.length + ' rows found.');
  } catch (error) {
    // Forward database exceptions straight to error handler middleware
    next(error);
  }
});


router.get('/webUsersAllRole', async function (req, res, next) {
  try {
    // Front-end-la irundhu varra role-ai edukirom
    const { userRole } = req.body; 

    let query = 'SELECT DISTINCT USER_ROLE  FROM web_user_master';
    let queryParams = [];

    // Oru vaelai userRole anuppirundha mattum filter pandrom
    // if (userRole) {
    //   query += ' WHERE USER_ROLE = ?';
    //   queryParams.push(userRole);
    // }

    // Execute query using connection pool safely with params
    const [rows] = await db.query(query);
    
    // Respond back with query payload data
    res.status(200).json({
      success: true,
      data: rows, 
      count: rows.length
    });

    console.log('Response for role:', userRole, '--', rows.length + ' rows found.');
  } catch (error) {
    // Forward database exceptions straight to error handler middleware
    next(error);
  }
});


router.post('/adminlogin', LoginController.loginAuthenticate);

module.exports = router;
