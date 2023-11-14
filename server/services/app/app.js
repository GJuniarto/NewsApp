require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4002;
const cors = require("cors");
const router = require("./router");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
});
