const Customer = require('../modules/customer');
const mongoose = require ('mongoose');
const Joi = require('joi');
const express = require('express');
const router = express.Router();



router.get('/', async (req, res) => {
    const customers = await Customer.find().sort('name');
    res.send(customers);
})

router.post('/', async (req, res) => {
    const schema = {
        name: Joi.string.min(5).max(50).required(),
        phone: Joi.string.min(5).max(50).required(),
        isGold: Joi.boolean
    };

    const result = Joi.validate(req.body, schema);

    if(result.error) return res.status(400).send(result.error.details[0].message);

    let customer = new Customer({ 
        name:req.body.name,
        phone:req.body.phone,
        isGold:req.body.isGold
    });
    customer = await customer.save();
    res.send(customer);
})

module.exports = router;