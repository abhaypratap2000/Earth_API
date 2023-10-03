const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const  route  = require("./module/route");
dotenv.config()
app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ limit: "1gb", extended: true }));
app.use(cookieParser());

app.use("/user", route);

app.listen(6000, () => {
    console.log("Express server listening on port 6000");
});