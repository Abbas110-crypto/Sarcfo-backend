const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const ContactuserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  company: {
    type: String,
  },
  subject: {
    type: String,
  },
  message: {
    type: String,
  },
  submissionDateTime:
  {
    type: String,
  }
})

const AdminSignupUserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  cpassword: {
    type: String,
    required: true,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true
      }
    }
  ]
}
);
const UpdateBlog = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  DateButton: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
  description: {
    type: String
  },
  CreatedAt:
  {
    type: String,
    required: true,
  },
  updatedAt:
  {
    type: String,
    required: true
  }
})

AdminSignupUserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 12);
    this.cpassword = await bcrypt.hash(this.cpassword, 12);
  }
  next();
});

AdminSignupUserSchema.methods.generateAuthToken = async function () {
  try {
    let Token = jwt.sign({ _id: this._id }, process.env.SECRETKEY);
    this.tokens = this.tokens.concat({ token: Token })
    await this.save();
    return Token;
  } catch (err) {
    console.log(err);
  }
}

const Blog_Database = mongoose.model('Blog', UpdateBlog);
const AdminSignup_PageUser = mongoose.model('admin-signup-user', AdminSignupUserSchema);
const ContactPageUser = mongoose.model('contact-user', ContactuserSchema);

module.exports = {
  AdminSignup_PageUser,
  ContactPageUser,
  Blog_Database,
};