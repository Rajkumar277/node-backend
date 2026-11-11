// controllers/district.controller.js

const bcrypt = require('bcrypt');


const LoginModel = require('../models/login.model');

class LoginController {
    /**
     * HTTP Handler for getting active districts
     */
    static async loginAuthenticate(req, res, next) {
        try {

            // Higher rounds = more secure, but slower processing. 12 is standard.
            const saltRounds = 12;

            var loginReqData = {}, loginauth = [];
            loginReqData = req.body;

            console.log(loginReqData);

            if (loginReqData.brandKey != '1') {
                console.error("error", "invalid access");
                return res.status(400).json({
                    success: false,
                    message: `"error", "invalid access"`
                });
            } else if (loginReqData.brandKey == '1') {
                const hashedPassword = bcrypt.hash(loginReqData.password, saltRounds);
                loginauth = await LoginModel.login(loginReqData.username, hashedPassword);
                console.log(loginauth, '1==loginauth');
            }

            let linkedHashMap = {};
            let Show_Summary, District;


            if (loginauth.length != 0) {
                if (loginauth[0]["show_summary"] != null) {
                    Show_Summary = loginauth[0]["show_summary"].toString();
                } else {
                    Show_Summary = "false";
                } if (loginauth[0]["district"] != null) {
                    District = loginauth[0]["district"].toString();
                } else {
                    District = "no districts mapped";
                }
            }
            // Request Parameter Validation
            return res.status(200).json({
                "Status": 'Success',
                "User_Role": loginauth[0]["USER_ROLE"],
                "User_ID": loginauth[0]["user_id"],
                "STATE": loginauth[0]["STATE"],
                "Show_Summary": Show_Summary,
                "District": District
            });
        } catch (error) {
            // Forward database exceptions to app-wide middleware error framework
            next(error);
        }
    }
}

module.exports = LoginController;