const CarsManager = require('./containers/carManager.js')

const carService = new CarsManager()

const enviroment = async() =>{
    console.log('Getting Cars')
    let cars = await carService.getAllCars();
    console.log(cars);
     
    console.log('Adding a car to your colecction.')
   
    let car = { //Here you put the variables for the new car.
        modelo: '',
        marca: ''
    }

    console.log('The car you are looking for is: .')
    let id = 2 //Here is the id for the car we are looking
        
    let deleteById = 10 //Here is the id for the car to be deleted

    await carService.addCar(car)
    await carService.getById(id)
    await carService.deleteById(deleteById)
    await carService.deleteAll()
}

enviroment()
