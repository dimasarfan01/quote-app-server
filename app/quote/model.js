const mongoose = require('mongoose');

let quoteSchema = mongoose.Schema(
  {
    quote: String,
    tags: [String],
    creator: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    likes: { type: [String], default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Quote', quoteSchema);
