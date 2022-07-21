import express from 'express';
import CarsManager from './containers/carManager.js';
import productosRouter from './routes/productos.router.js';

const app=express();
const nCarManager=new CarsManager();
let contadorVisitas=0;

// Server configuration
const PORT=8080;
const server=app.listen(PORT, () => {
    console.log(`Listening on PORT=${PORT}`)
});
server.on('error', (error) => console.log(`Server error: ${error}`));

//static files
app.use(express.static('public'));
//Estructra de la API
app.use(express.json());

//productos
app.use('/productos',productosRouter);

// index
app.get('/', (req, res) => {
    contadorVisitas++
    res.send(`La cantidad de visistas al index son ${contadorVisitas}`)
})

