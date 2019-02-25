const express = require('express');
const Country = require('../models/Country')

const router = express.Router();


router.use((req, res, next) => {
  console.log('DEBUG routes/countries');
  next()
})

// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
    .then(countries => {
      res.json(countries);
    })
    .catch(err => next(err))
});

router.get('/:id', (req, res, next) => {
  Country.findById(req.params.id)
    .then(country => {
      res.json(country);
    })
    .catch(err => next(err))
});

// Route to add a country
router.post('/', (req, res, next) => {
  let { name, capitals, area, description } = req.body
  Country.create({ name, capitals, area, description })
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err))
});

// The route is DELETE /api/countries/:id
router.delete('/:id', (req,res,next)=>{
  Country.findByIdAndDelete(req.params.id)
    .then(country => {
      res.json({
        message: "The country was deleted",
        country: country // The deleted country is sent
      })
    })
    .catch(err => next(err))
})

// The route is PUT /api/countries/:id
router.put('/:id', (req,res,next)=>{
  Country.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    description: req.body.description,
    capitals: req.body.capitals,
    area: req.body.area,
  }, { new: true }) // To access the updated country (and not the old country)
    .then(country => {
      res.json({
        message: "The country has been updated",
        country: country
      })
    })
    .catch(err => next(err))
})

module.exports = router;
