const fs = require('fs');
const path = "./src/files/cars.json"

class CarsManager{
    getAllCars = async() =>{
        try {
            if(fs.existsSync(path)){
                let fileData = await fs.promises.readFile(path, 'utf-8')
                let cars = JSON.parse(fileData)
                return cars;
            }else{
                return [];
            }
        } catch (error) {
            console.log('Cannot read file:' + error)
        }
    }

    addCar = async(car) =>{
        try {
            let cars = await this.getAllCars();
            if(cars.length === 0){
                car.id=1;
                cars.push(car);
                await fs.promises.writeFile(path, JSON.stringify(cars, null, '\t'))
            }else{
                car.id = cars[cars.length-1].id+1;
                cars.push(car);
                await fs.promises.writeFile(path, JSON.stringify(cars, null, '\t'))
            }
        } catch (error) {
            console.log('Cannot write file: ' + error)
        }
    }
    getById = async(id) => {
        try {
            let objetId = await this.getAllCars()
            const filtrar = objetId.find((item) =>{
                if(id == item.id){
                    return item
                }else{
                    return null
                }
            })

            return console.log("GetByID: ", filtrar)
        } catch (error) {
            console.log('We cannot find the id: ' +error)
        }
    }
    deleteById = async(id) =>{
        try{
            let eliminar = await this.getAllCars()
            const eliminate = eliminar.filter((item) =>{
                if(id != item.id){
                    return item
                }else{
                    return null
                }
            })
            const nuevoArray = fs.promises.writeFile(path, JSON.stringify(eliminate, null, '\t'))
            console.log("deletByID: Car successfully deleted")
            return nuevoArray
        }catch(error){
            console.log('Cannot delete car: ' +error)
        }
    }
    deleteAll = async() => {
        try{
            await fs.promises.writeFile(path, '[]')
        } catch (error) {
            console.log(error)
        }
    } 
}

module.exports = CarsManager;