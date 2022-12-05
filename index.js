const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;

dbo.connectToServer();
app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});