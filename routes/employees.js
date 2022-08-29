const express = require("express")
const ObjectId = require('mongodb').ObjectID;
const db = require('../db')
const { validateCreate } = require('../validators/employees')
const employees = express.Router()

employees.get('/', (req, res) => {
    const manoloDB = db.getDb()

    manoloDB.collection('employees').find({}).toArray((err, result) => {
        if(err) {
            res.status(400).send('Error fetching employees!')
        } else {
            res.json(result)
        }
    })
})

employees.post('/create', validateCreate, (req, res) => {
    const manoloDB = db.getDb()
    const data = req.body
    
    manoloDB.collection('employees').insertOne(data)
        .then((employee, err) => {
            if (err) res.status(500).send(err)
            res.send(employee)
        })
})

employees.get('/:id', (req, res) => {
    const manoloDB = db.getDb()
    const id = req.params.id
    manoloDB.collection('employees').findOne({_id: ObjectId(id)})
        .then((employee, err) => {
            if (err) res.status(500).send(err)
            else if (!res) res.status(404).send('Employee not found')
            res.send(employee)
        })
})

module.exports = employees