const libExpress = require('express')
const util = require('../util')
const ObjectId = require('mongodb').ObjectId

product = libExpress.Router()

//Rout to get all data.
product.get('/', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('products').find().toArray()
                .then((USER) =>{
                     res.status(200).json({ data: USER })
                    })
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to get specific data.
product.get('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('products').find({ _id: new ObjectId(req.params.id) }).toArray()
                .then((getUser) => res.status(200).json({ data: getUser }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to post specific data.
product.post('/', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('products').insertOne({ brandName: "boat", category: "airpodes", price: "3200" })
                .then((postUser) => res.status(200).json({ data: postUser }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

//Route to delete specific data.
product.delete('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('products').deleteOne({ _id: new ObjectId(req.params.id) })
                .then((deleteUser) => res.status(202).json({ data: deleteUser }))
                .catch(e => res.status(500).json({ error: "Internal server error -- Failed to delete!" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })

        }
    })
})

// Route to put specific data
product.put('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('products').updateOne({ _id: new ObjectId(req.params.id) }, { $set: {brandName: "boat", category: "airpodes", price: "3200" } })
                .then((putUser) => res.status(202).json({ data: putUser }))
                .catch(e => res.status(500).json({ error: "Internal server error --        Failed to Update" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
})

// Route to patch specific data
product.patch('/:id', (req, res, _) => {
    util.getDbConnection(function (db) {
        if (db) {
            db.collection('products').find({ _id: new ObjectId(req.params.id) }).toArray()
                .then((getUser) => res.status(200).json({ data: getUser }))
                .catch(e => res.status(500).json({ error: "Internal server error" }))
        }
        else {
            res.status(500).json({ error: "Internal server error" })
        }
    })
    // const updateData = req.body; // Get the fields to update from the request body
    // util.getDbConnection(function (db) {
    //     if (db) {
    //         db.collection('products').updateOne({ _id: new ObjectId(req.params.id) },
    //             { $set: updateData }
    //         )
    //             .then((patchUser) => res.status(202).json({ data: patchUser }))
    //             .catch(e => res.status(500).json({ error: "Internal server error -- Failed to Update!" }));
    //     } else {
    //         res.status(500).json({ error: "Internal server error" });
    //     }
    // });
});

product.use('*', (req, res, next) => {
    res.status(404).json({ error: "Invalid Method!" })
})


module.exports = product