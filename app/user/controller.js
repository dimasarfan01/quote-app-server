const User = require('./model');

module.exports = {
  checkExistedEmail: async (req, res) => {
    try {
      const { email } = req.body;
      const getData = await User.countDocuments({ email });
      res.status(200).json({ data: getData });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || `Internal server error` });
    }
  },
};
