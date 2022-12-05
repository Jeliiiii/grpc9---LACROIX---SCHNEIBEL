const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();



dbo.connectToServer();
app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.listen(port, function () {
    console.log(`App listening on port ${port}!`);
});

app.get("/pokemon5g/Pokemon", function (req, res) {
    //on se connecte à la DB MongoDB
    const dbConnect = dbo.getDb();
    //premier test permettant de récupérer mes pokemons !
    dbConnect
        .collection("Pokemon")
        .find({}) // permet de filtrer les résultats
        /*.limit(50) // pourrait permettre de limiter le nombre de résultats */
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching pokemons!");
            } else {
                res.json(result);
            }
        });
});
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/pokemon5g/Pokemon', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    dbConnect
    const body = req.body;
    console.log('Got body:', body);
    res.json(body);
});