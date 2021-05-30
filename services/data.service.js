const db = require("./db");

const signup = (fname, lname, email, password, city) => {
  console.log("sigup called");

  return db.User.findOne({ email }).then((user) => {
    console.log("email got ?" + user);

    if (user) {
      return {
        status: false,
        message: "email already exists please login",
        statusCode: 420,
      };
    } else {
      const newUser = new db.User({
        fname,
        lname,
        email,
        password,
        city,
      });
      newUser.save();
      console.log("new user added");

      return {
        status: true,
        statusCode: 200,
        message: "registered suuc",
      };
    }
  });
};

const login = (email, password) => {
  console.log("login called");
  return db.User.findOne({ email, password: password }).then((loginn) => {
    if (loginn) {
      // req.session.currentUser = loginn.email
      return {
        status: true,
        message: "login success",
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "invalid creds",
        statusCode: 420,
      };
    }
  });
};



module.exports = {
  signup,
  login,
};
