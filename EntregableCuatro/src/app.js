//import express from 'express';
//import {CarsManager} from './containers/carManager.js';
const express = require('express')
const CarsManager = require('./containers/carManager.js')

const app=express()
const nCarManager=new CarsManager();
let contadorVisitas=0

// Server configuration
const PORT=8080
const server=app.listen(PORT, () => {
    console.log(`Listening on PORT=${PORT}`)
})
server.on('error', (error) => console.log(`Server error: ${error}`))

// index
app.get('/', (req, res) => {
    contadorVisitas++
    res.send(`La cantidad de visistas al index son ${contadorVisitas}`)
})

// All Products
app.get('/productos', async (req, res) => {
    const allProducts = await nCarManager.getAllCars()
    res.send(allProducts)
})

// Random Product
app.get('/productoRandom', async (req, res) => {
    const allProducts = await nCarManager.getAllCars()
    const randomIndex = Math.floor(Math.random() * allProducts.length )
    const randomProduct = allProducts[randomIndex]
    res.send(randomProduct)
})