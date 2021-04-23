const express = require('express')
const Joi = require('@hapi/joi')
const { insertItem, getItems, updateGeoLat, updateGeoLon, updateSedeName ,updateSedePoblacion } = require('./db')

const router = express.Router()

const itemSchema = Joi.object().keys({
  sede_name: Joi.string(),
  geo_lat: Joi.number().integer().min(0),
  geo_lon: Joi.number().integer().min(0),
  sede_poblacion: Joi.string()
})

router.post('/createSede', (req, res) => {
  const item = req.body
  console.log(req.body)
  const result = itemSchema.validate(item)
  if (result.error) {
    console.log(result.error)
    res.status(400).end()
    return
  }
  insertItem(item)
    .then(() => {
      res.status(200).end()
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

router.get('/sedes', (req, res) => {
  getItems()
    .then((items) => {
      items = items.map((item) => ({
        id: item._id,
        sede_name: item.sede_name,
        geo_lat: item.geo_lat,
        geo_lon: item.geo_lon,
        sede_poblacion: item.sede_poblacion,
      }))
      res.json(items)
    })
    .catch((err) => {
      console.log(err)
      res.status(500).end()
    })
})

router.put('/updateSedes/:id/geo_lat/:geo_lat', (req, res) => {
    const { id, geo_lat } = req.params
    updateGeoLat(id, parseInt(geo_lat))
        .then(() => {
            res.status(200).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
})

router.put('/updateSedes/:id/geo_lon/:geo_lon', (req, res) => {
    const { id, geo_lon } = req.params
    updateGeoLon(id, parseInt(geo_lon))
        .then(() => {
            res.status(200).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
})

router.put('/updateSedes/:id/sede_name/:sede_name', (req, res) => {
    const { id, sede_name } = req.params
    updateSedeName(id, sede_name)
        .then(() => {
            res.status(200).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
})

router.put('/updateSedes/:id/sede_poblacion/:sede_poblacion', (req, res) => {
    const { id, sede_poblacion } = req.params
    updateSedePoblacion(id, sede_poblacion)
        .then(() => {
            res.status(200).end()
        })
        .catch((err) => {
            console.log(err)
            res.status(500).end()
        })
})

module.exports = router
