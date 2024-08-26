const express = require("express");
const session = require("express-session");
const cors = require("cors");

const bodyParser = require("body-parser");

const app = express();
require("dotenv").config();

const router = require("./routes/messageRoutes.js");
const { googleRouter } = require("./routes/googleAuthRoutes.js");
const  outlookRouter  = require("./routes/outlookRoutes.js");

app.use(bodyParser.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use(
  session({
    secret: "any_secret_key",
    resave: false,
    saveUninitialized: false,
  })
);

// MessageRoutes
app.use("/", googleRouter);
app.use("/api/mail", router);
app.use("/outlook", outlookRouter);

app.get("/", async (req, res) => {
   res.redirect("https://documenter.getpostman.com/view/31971527/2sA35D43FE")
});

const PORT  = process.env.PORT || 5000 ;

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
