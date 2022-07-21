import fs from 'fs';
const path = './files/productos.json'

class Contenedor{
    getAll = async() =>{
        try {
            if(fs.existsSync(path)){      
                let fileData = await fs.promises.readFile(path,'utf-8');
                let lista = JSON.parse(fileData);
                return lista;
            }else{
                return [];
            }
        } catch (error) {
            console.log("Hay un error " + error)
        }
    }

    save = async(producto) =>{
        try {
            let lista = await this.getAll();
            if(lista.length===0){
                producto.id= 1;
                lista.push(producto);
                await fs.promises.writeFile(path,JSON.stringify(lista,null,'\t'));
            }else{
                producto.id = lista[lista.length-1].id+1
                lista.push(producto)
                console.log(producto)
                await fs.promises.writeFile(path,JSON.stringify(lista,null,'\t'))
            }
        } catch (error) {
            console.log("Hay un error: "+ error )
        }
    }

    getById = async(idNumber) =>{
        try {
            const data = await this.getAll();
            if(data.id !=idNumber){
                console.log(data.find((element) => element.id == idNumber))
                return data.find((element) => element.id == idNumber)
            }else{
                console.log("null")
            }

        } catch (error) {
            console.log("Hay un error: " + error)
        }
    }
    deleteById = async(idDelete) =>{
        try {
            const arr = await this.getAll()
            if (arr[arr.length-1].id>=idDelete) {
                const borrar = arr.filter((item) => item.id != idDelete)
                await fs.promises.writeFile(path, JSON.stringify(borrar,null,'\t'))
            } else {
                console.log("El id pedido no existe")
            }
        } catch (error) {
            console.log("Hay un error:" + error)
        }
    }
    deleteAll = async() =>{
        try {
            await fs.promises.unlink(path);
            console.log("Datos Borrados")
        } catch (error) {
            console.log("Hay un error: " + error)
        }
    }
    getRandom = async() =>{
        try {
            const arr = await this.getAll()
            let numeroRandom = Math.floor(Math.random()*arr.length+1)
            return (arr.find((element) => element.id == numeroRandom))
        } catch (error) {
            console.log("Hay un error" + error )
        }
    }
    actualizar = async(obj) =>{
        let arr = await this.getAll()
        let id = obj.id;
        let titulo = obj.title;
        let price = obj.prices;
        let thumbnail = obj.thumbnail;
        arr.map(function(dato){
            if(dato.id == id){
                dato.title = titulo;
                dato.prices = price;
                dato.thumbnail = thumbnail;
            }
        })
        await fs.promises.writeFile(path,JSON.stringify(arr,null,'\t'));
        console.log(arr)
        return arr;
    }

}

export default Contenedor;