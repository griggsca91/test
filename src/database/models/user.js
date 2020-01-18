const mongoose = require('mongoose');

const { randomBytesAsync, pbkdf2Async } = require('../../services/promisify');

const userSchema = new mongoose.Schema(
  {
    email: { type: String, unique: true },
    password: { type: String, required: true, select: false },
    salt: { type: String, select: false },
    createdAt: { type: Date },
    updatedAt: { type: Date },
  },
  {
    versionKey: false,
  },
);

userSchema.pre('save', async function(next) {
  try {
    this.salt = await randomBytesAsync(128).toString('base64');
    this.password = await this.encryptedPassword(this.password);
    const now = new Date().toISOString();
    this.updatedAt = now;

    if (!this.createdAt) {
      this.createdAt = now;
    }

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.pre('findOneAndUpdate', function(next) {
  try {
    const now = new Date().toISOString();
    if (this._update.$set) {
      this._update.$set.updatedAt = now;
    } else {
      this._update.$set = {
        updatedAt: now,
      };
    }

    next();
  } catch (error) {
    next(error);
  }
});

userSchema.methods.encryptedPassword = async function(password) {
  const encryptedPassword = await pbkdf2Async(password, this.salt, 10000, 128, 'sha1');
  return encryptedPassword.toString();
};

userSchema.methods.checkPassword = async function(password) {
  let result = false;

  if (password && this.password) {
    const encryptedPassword = await this.encryptedPassword(password);
    result = encryptedPassword === this.password;
  }

  return result;
};

module.exports = mongoose.model('User', userSchema);
