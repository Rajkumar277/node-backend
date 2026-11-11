// controllers/district.controller.js
const VillageModel = require('../models/village-master.model');

class DistrictController {
  /**
   * HTTP Handler for getting active districts
   */
  static async getActiveDistricts(req, res, next) {
    try {
      const { lang } = req.body;

      // Request Parameter Validation
      if (!lang) {
        return res.status(400).json({ 
          success: false, 
          message: "Missing 'state' or 'lang' query parameters." 
        });
      }

      // Delegate data fetching action to the Model layer
      const districts = await VillageModel.findDistricts(lang);

      // Return unified JSON client response
      return res.status(200).json({
        success: true,
        count: districts.length,
        data: districts
      });
    } catch (error) {
      // Forward database exceptions to app-wide middleware error framework
      next(error);
    }
  }
}

module.exports = DistrictController;