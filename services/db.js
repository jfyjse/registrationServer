const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/registration_server", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const User = mongoose.model("User", {
  fname: String,
  lname: String,
  email: String,
  password: String,
  city: String,
});
module.exports = {
  User,
};
