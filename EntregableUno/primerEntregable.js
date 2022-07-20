class Usuario {
    constructor(name,lastname){
        this.name=name;
        this.lastname=lastname;
        this.books=[];
        this.petss=[];
    }
    getfullname = function(){
       console.log(`Hola, mi nombre es ${this.name} ${this.lastname}. Un gusto saludarte.`)
    }
    addpet = function(pet){
        this.petss.push(pet);
    }
    countpets=function(){
        console.log(`Tengo ${this.petss.length} mascotas`);
    }
    addbook=function(title,author){
        this.books.push({Title:title, Author:author});
    }
    getbooknames=function(){
        let names = this.books.map(function(name){
            return `${name.Title}`;
        })
        console.log(`Mis libros favoritos son ${names}`)
    }
}

const usuario1 = new Usuario("Ismael","Abero");

usuario1.addbook("El hombre que calcuba","Malba Tahan");
usuario1.addbook("Agilmente","Estanislao Bachrach");

usuario1.addpet("Perro - Rocky");
usuario1.addpet("Gato - Pelusa");

usuario1.getfullname();
usuario1.countpets();
usuario1.getbooknames();
