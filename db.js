const { MongoClient, ObjectId } = require('mongodb')

const connectionUrl = 'mongodb://localhost:27017'
const dbName = 'store'

let db

const init = () =>
  MongoClient.connect(connectionUrl, { useNewUrlParser: true }).then((client) => {
    db = client.db(dbName)
  })

const insertItem = (item) => {
  const collection = db.collection('items')
  return collection.insertOne(item)
}

const getItems = () => {
  const collection = db.collection('items')
  return collection.find({}).toArray()
}

const updateGeoLat = (id, geo_lat) => {
  const collection = db.collection('items')
  return collection.updateOne({ _id: ObjectId(id) }, { $set: { geo_lat } })
}

const updateGeoLon = (id, geo_lon) => {
  const collection = db.collection('items')
  return collection.updateOne({ _id: ObjectId(id) }, { $set: { geo_lon } })
}

const updateSedeName = (id, sede_name) => {
  const collection = db.collection('items')
  return collection.updateOne({ _id: ObjectId(id) }, { $set: { sede_name } })
}

const updateSedePoblacion = (id, sede_poblacion) => {
  const collection = db.collection('items')
  return collection.updateOne({ _id: ObjectId(id) }, { $set: { sede_poblacion } })
}



module.exports = { init, insertItem, getItems, updateGeoLat, updateGeoLon, updateSedeName, updateSedePoblacion }
