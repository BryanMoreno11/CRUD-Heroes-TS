export class Heroe{
    Codigo:number;
    Nombre:string;
    Edad:number;
    Ciudad:string;
    Imagen?:string;

    constructor(Codigo:number,Nombre:string,Edad:number,Ciudad:string, Imagen?:string){
        this.Codigo=Codigo;
        this.Nombre=Nombre;
        this.Edad=Edad;
        this.Ciudad=Ciudad;
        this.Imagen=Imagen;
    }
}