const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const HASH_ROUND = 10;

let userSchema = mongoose.Schema(
  {
    email: {
      type: String,
      require: [true, 'email harus diisi'],
      unique: true,
    },
    name: {
      type: String,
      require: [true, 'nama harus diisi'],
      unique: true,
      maxlength: [225, 'panjang username harus antara 3 - 225 karakter'],
      minlength: [3, 'panjang username harus antara 3 - 225 karakter'],
    },
    password: {
      type: String,
      require: [true, 'kata sandi harus diisi'],
      maxlength: [225, 'panjang password maksimal 225 karakter'],
    },
    gender: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.path('email').validate(
  async function (value) {
    try {
      const count = await this.model('User').countDocuments({ email: value });
      return !count;
    } catch (err) {
      throw err;
    }
  },
  (attr) => `${attr.value} sudah terdaftar`
);

userSchema.pre('save', function (next) {
  this.password = bcrypt.hashSync(this.password, HASH_ROUND);
  next();
});

module.exports = mongoose.model('User', userSchema);
