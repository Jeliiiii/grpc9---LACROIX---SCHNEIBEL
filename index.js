const express = require("express");
const dbo = require("./db/db");
const app = express();
const port = 4444;
const bodyParser = require('body-parser');
const db = require("./db/db");
const jsonParser = bodyParser.json();


app.use(bodyParser.urlencoded({ extended: true }));

dbo.connectToServer();
app.get("/", function (req, res) {
    res.send("Hello World!");
});

app.listen(port, function () {
    console.log(`Vous êtes sur le port: ${port}!`);
});

app.get("/pokemon/get", function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("Pokemon")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching pokemons!");
            } else {
                res.json(result);
            }
        });
});

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
    dbConnect.collection("Pokemon").updateOne({num:body.num}, {$set:{name:body.newname , type:body.newtype}})
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





app.get("/type/get", function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("TypePokemon")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching pokemons!");
            } else {
                res.json(result);
            }
        });
});

app.post('/type/post', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    dbConnect.collection("TypePokemon").insertOne(body).then(function (result, err) {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result);
        }
    });
});

app.post('/type/update', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    console.log('Got body:', body);
    dbConnect.collection("TypesPokemon").updateOne({type:body.type}, {$set:{type:body.newtype}})
    res.json(body);
});

app.delete('/type/delete', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    dbConnect.collection("TypePokemon").deleteOne(body).then(function (result, err) {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result);
        }
    });
});





app.get("/pokedex/get", function (req, res) {
    const dbConnect = dbo.getDb();
    dbConnect
        .collection("Pokedex")
        .find({})
        .toArray(function (err, result) {
            if (err) {
                res.status(400).send("Error fetching pokemons!");
            } else {
                res.json(result);
            }
        });
});


app.post('/pokedex/post', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    dbConnect.collection("Pokedex").insertOne(body).then(function (result, err) {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result);
        }
    });
});

app.post('/pokedex/update', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    console.log('Got body:', body);
    dbConnect.collection("Pokedex").updateOne({num:body.num}, {$set:{num:body.newnum , name:body.newname , type:body.newtype}})
    res.json(body);
});

app.delete('/pokedex/delete', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    dbConnect.collection("Pokedex").deleteOne(body).then(function (result, err) {
        if (err) {
            res.status(400).send(err.message);
        } else {
            res.json(result);
        }
    });
});
