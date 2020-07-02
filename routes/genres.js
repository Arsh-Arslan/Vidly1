const Genres = require('../modules/genres')
const Joi = require('joi');
const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

// router.get('/', (req, res) => {
//      res.send('Hello World');
// });

router.get('/', async (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send (genres);
})

router.post('/', async (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema); 

    if (result.error) return res.status(400).send(result.error.details[0].message);
    

    let genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);
})

router.get('/:id', async (req, res) => {
    const genre = await Genre.findById(req.params.id);
    
    if(!genre) return res.status(404).send ('The genre was not found');
    return res.send(genre);
})

router.put('/:id', async (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
      };
    const result = Joi.validate(req.body, schema); 
    if (result.error) return res.status(400).send(result.error.details[0].message);
    const genre = await Genre.findByIdAndUpdate(req.params.id, {name:req.body.name}, {
        new: true
    })
    
    //console.log("genre object "+genre);
    //console.log("genres object "+genres);

    if(!genre) return res.status(404).send ('The genre was not found');
    
    res.send(genre);
});

router.delete('/:id',async (req,res) => {
    const genre = await Genre.findByIdAndRemove(req.params.id);

    if(!genre) return res.status(404).send ('The genre was not found');

    res.send(genre);

})

module.exports = router;