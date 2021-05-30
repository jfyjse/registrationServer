const express = require("express");
const app = express();
const dataservice = require("./services/data.service");
const session = require("express-session");
const cors = require("cors");

app.use(cors({ origin: "http://localhost:4200", credentials: true }));

app.use(express.json());

app.use(
  session({
    secret: "randomsecurestring",
    resave: false,
    saveUninitialized: false,
  })
);

const Authenticate = (req, res, next) => {
  if (!req.session.currentUser) {
    return res.json({
      status: false,
      statusCode: 403,
      message: "invalid login",
    });
  } else {
    next();
  }
};

app.post("/signup", (req, res) => {
  dataservice
    .signup(
      req.body.fname,
      req.body.lname,
      req.body.email,
      req.body.password,
      req.body.city
    )
    .then((result) => {
      res.status(result.statusCode).json(result);
    });
});

app.post("/login", (req, res) => {
  dataservice.login(req, req.body.email, req.body.password).then((result) => {
    res.status(result.statusCode).json(result);
  });
});

app.get("/getdata/:id", Authenticate, (req, res) => {
  dataservice
    .getData(req.params.id)
    .then((result) => res.status(res.statusCode).json(result));
});

app.listen(3000, () => {
  console.log("Started Listening at Port 3000");
});
