import express from 'express'
import productosRouter from './routers/productos.router.js'

const app = express()
const PORT = 8080;


const server = app.listen(PORT,()=>{
    console.log(`Èscuchando en el puerto ${PORT}`)
})
app.use(express.json())
app.use('/api/productos',productosRouter);
app.use(express.static('public'))