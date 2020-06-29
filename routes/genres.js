const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

const genreSchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 5,
        maxlength:50
    }
});

const Genre = new mongoose.model('Genre', genreSchema);




// router.get('/', (req, res) => {
//      res.send('Hello World');
// });

router.get('/', (req, res) => {
    const genres = await Genre.find().sort('name');
    res.send (genres);
})

router.post('/', (req, res) => {
    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema); 

    if (result.error) return res.status(400).send(result.error.details[0].message);
    

    const genre = new Genre({ name: req.body.name });
    await genre.save();
    res.send(genre);
})

router.get('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send ('The genre was not found');
    return res.send(genre);
})

router.put('/:id', (req, res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    //console.log("genre object "+genre);
    //console.log("genres object "+genres);

    if(!genre) return res.status(404).send ('The genre was not found');

    const schema = {
        name: Joi.string().min(3).required()
    };

    const result = Joi.validate(req.body, schema); 
    if (result.error) return res.status(400).send(result.error.details[0].message);

    genre.name = req.body.name;
    //res.send(genre);
    res.send(genres);
});

router.delete('/:id', (req,res) => {
    const genre = genres.find(c => c.id === parseInt(req.params.id));
    if(!genre) return res.status(404).send ('The genre was not found');

    const index = genres.indexOf(genre);
    genres.splice(index,1);

    res.send(genre);

})

module.exports = router;