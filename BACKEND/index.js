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

//pour voir tous les pokemons disponibles dans la bdd
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

//pour ajouter un pokemon dans la bdd
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

//pour modifier un pokemon dans la bdd
app.post('/pokemon/update', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    console.log('Got body:', body);
    dbConnect.collection("Pokemon").updateOne({num:body.num}, {$set:{name:body.newname , type:body.newtype}})
    res.json(body);
});

//pour supprimer un pokemon dans la bdd
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

//pour voir tous les types disponibles dans la bdd
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

//pour ajouter un type dans la bdd
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

//pour modifier un type dans la bdd
app.post('/type/update', jsonParser, (req, res) => {
    const dbConnect = dbo.getDb();
    const body = req.body;
    console.log('Got body:', body);
    dbConnect.collection("TypesPokemon").updateOne({type:body.type}, {$set:{type:body.newtype}})
    res.json(body);
});

//pour supprimer un type dans la bdd
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

//pour voir tous les pokemons qu'on a attrapés dans la bdd
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

//pour ajouter un pokemon qu'on a attrapé dans la bdd
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

//pour supprimer un pokemon qu'on a attrapé dans la bdd (relâcher)
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