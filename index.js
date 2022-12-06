const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const db = require("./db/db");
const jsonParser = bodyParser.json();



dbo.connectToServer();
app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.listen(port, function () {
    console.log(`Vous êtes sur le port: ${port}!`);
});

app.get("/pokemon/get", function (req, res) {
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

app.post('/pokemon/post', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    dbConnect.collection("Pokemon").insertOne(body).then(function (result, err) {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result);
        }
    });
});

app.post('/pokemon/update', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    console.log('Got body:', body);
    dbConnect.collection("Pokemon").updateOne({num:body.num}, {$set:{num:body.newnum , name:body.newname , type:body.newtype}})
    res.json(body);
});

app.delete('/pokemon/delete', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    dbConnect.collection("Pokemon").deleteOne(body).then(function (result, err) {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result);
        }
    });
});