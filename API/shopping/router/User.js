const libExpress = require('express')
const util = require('../util')
const ObjectId = require('mongodb').ObjectId

user = libExpress.Router()

//Rout to get all data.
user.get('/', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').find().toArray()
                .then((getUser) => res.status(200).json({ data: getUser }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to get specific data.
user.get('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').find({ _id: new ObjectId(req.params.id) }).toArray()
                .then((getUser) => res.status(200).json({ data: getUser }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to post specific data.
user.post('/', (req, res, _) => {
    const {name, email, password} = req.body
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').insertOne({ name, email , password })
                .then((postUser) => res.status(200).json({ data: postUser }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to delete specific data.
user.delete('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').deleteOne({ _id: new ObjectId(req.params.id) })
                .then((deleteUser) => res.status(202).json({ data: deleteUser }))
                .catch(e => res.status(500).json({ error: "Internal server error -- Failed to delete!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })

        }
    })
})

// Route to put specific data
user.put('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').updateOne({ _id: new ObjectId(req.params.id) }, 
            { $set: { name: "Ankit" } })
                .then((putUser) => res.status(202).json({ data: putUser }))
                .catch(e => res.status(500).json({ error: "Internal server error -- Failed to Update!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

// Route to patch specific data.

user.patch('/:id', (req, res, _) => {
    const updateData = req.body; // Get the fields to update from the request body
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('users').updateOne(
                { _id: new ObjectId(req.params.id) },
                { $set: updateData }
            )
                .then((patchUser) => res.status(202).json({ data: patchUser }))
                .catch(e => res.status(500).json({ error: "Internal server error -- Failed to Update!" }));
        } else {
            res.status(500).json({ error: "Internal server error" });
        }
    });
});

user.use('*', (req, res, next) => {
    res.status(404).json({ error: "Invalid Method!" })
})


module.exports = user