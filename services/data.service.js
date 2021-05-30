const db = require("./db");

const signup = (fname, lname, email, password, city) => {
  console.log("sigup called");

  return db.User.findOne({ email }).then((user) => {
    console.log("email got ?" + user);

    if (user) {
      return {
        status: false,
        message: "email already exists please login",
        statusCode: 422,
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

const login = (req, email, password) => {
  console.log("login called");
  return db.User.findOne({ email, password: password }).then((result) => {
    if (result) {
      req.session.currentUser = result.email
      return {
        status: true,
        message: "login success",
        statusCode: 200,
      };
    } else {
      return {
        status: false,
        message: "invalid creds",
        statusCode: 422,
      };
    }
  });
};

const getData=(email)=>{
  return db.User.findOne({email}).then((result)=>{
    if(result){
      return{
        status :true,
        statusCode:200,
        fname:result.fname,
        lname:result.lname,
        city:result.city
  
      }
    }
else{
  return{
    status:false,
    statusCode: 422,
    message: "no data found"
    
  }
}
    
  })
  
}

module.exports = {
  signup,
  login,
  getData
};
