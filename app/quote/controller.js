const Quote = require('./model');

module.exports = {
  postQuote: async (req, res) => {
    try {
      const payload = req.body;
      const newQuote = new Quote({ ...payload, creator: req.user._id });
      await newQuote.save();
      res.status(201).json({ data: newQuote });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || `Internal server error` });
    }
  },
  getQuoteById: async (req, res) => {
    try {
      const { id } = req.params;
      const post = await Quote.findOne({ _id: id });
      res.status(200).json({ data: post });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || `Internal server error` });
    }
  },
  deleteQuoteById: async (req, res) => {
    try {
      const { id } = req.params;
      await Quote.findOneAndDelete({ _id: id });
      res.status(200).json({ data: 'Delete quote successfully' });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || `Internal server error` });
    }
  },
  getQuote: async (req, res) => {
    try {
      let { page = 1, limit = 1, tag = null } = req.query;
      const startIndex = (Number(page) - 1) * limit;
      const total = await Quote.countDocuments(
        tag ? { tags: { $in: tag.split(',') } } : null
      );
      const posts = await Quote.find(
        tag ? { tags: { $in: tag.split(',') } } : null
      )
        .sort({ _id: -1 })
        .limit(Number(limit))
        .skip(startIndex)
        .populate({ path: 'creator', select: 'name email' });
      res.status(200).json({
        data: posts,
        currentPage: Number(page),
        numberOfPages: Math.ceil(total / limit),
      });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || `Internal server error` });
    }
  },
  updateQuote: async (req, res) => {
    try {
      const { id } = req.params;
      const { quote, tags } = req.body;
      const update = await Quote.findOneAndUpdate(
        { _id: id },
        {
          quote: quote,
          tags: tags,
        },
        { new: true }
      );
      res.status(200).json({ data: update });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || `Internal server error` });
    }
  },
  postLikeQuote: async (req, res) => {
    try {
      const { id } = req.params;
      const postQuote = await Quote.findOne({ _id: id });
      const getIndex = postQuote.likes.findIndex(
        (id) => id === String(req.user._id)
      );
      if (getIndex === -1) {
        postQuote.likes.push(req.user._id);
      } else {
        postQuote.likes = postQuote.likes.filter(
          (id) => id !== String(req.user._id)
        );
      }
      const updatedPost = await Quote.findOneAndUpdate({ _id: id }, postQuote, {
        new: true,
      });
      res.status(200).json({ data: updatedPost });
    } catch (error) {
      res
        .status(500)
        .json({ message: error.message || `Internal server error` });
    }
  },
};
