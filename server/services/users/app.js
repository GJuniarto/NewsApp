const express = require("express");
const cors = require("cors");
const { connectDB } = require("./config/connection");
const router = require("./router");
const PORT = process.env.PORT || 4001;

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(router);

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log("App listening to", PORT);
    });
});
