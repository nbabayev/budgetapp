const express = require('express');
const bodyParser = require('body-parser');

var app = express();
const port = process.env.PORT || 3001;

var {mongoose} = require('./db/mongoose');
var {Budget} = require('./model/budget');

app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.post('/addBudget', (req, res) => {

    let {category, note, amount, type} = req.body;
 
    let data = {
        category, note, amount, type
    }

    var budget = new Budget(data);

    budget.save().then((doc) => {
        res.send(doc);
    }, (e) => {
        res.status(400).send(e);
    });

});

app.get('/getBudgets', (req, res) => {

    Budget.find({}, function (err, data) {
        if(err) console.log('xeta bas verdi');
        
        if (data) {
            res.send(data);
        }
    });

});

app.delete('/deleteBudget/:id', (req, res) => {

    let id = req.params.id;

    Budget.remove({ _id: id }, function(err) {
       if (!err) {
           res.sendStatus(200);
       }
    });

});

app.listen(port, () => {
    console.log(`Started up at port ${port}`);
});


