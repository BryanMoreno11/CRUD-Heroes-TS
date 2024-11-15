import { Heroe } from "../Entidades/Heroe";

export { ListaHeroes };

let ListaHeroes: Heroe[] = [
  {
    Codigo: 1,
    Nombre: "Batman",
    Edad: 40,
    Ciudad: "Gotica",
    Imagen: "https://www.shutterstock.com/image-vector/june-7-2024-batman-illustration-600nw-2481357159.jpg"
  },
  {
    Codigo: 2,
    Nombre: "Spiderman",
    Edad: 20,
    Ciudad: "New York",
    Imagen: "https://cdn.openart.ai/stable_diffusion/6054ebc08db2e8c01dec274cefa0742e8c009688_2000x2000.webp"
  },
  {
    Codigo: 3,
    Nombre: "Superman",
    Edad: 35,
    Ciudad: "Metropolis",
    Imagen: "https://tr.rbxcdn.com/180DAY-6540dad9383363ae2def49071164d089/420/420/Hat/Webp/noFilter"
  },
];

// Funcion insertar heroes
export function Insertar(imagen:string) {
  let img:string="";
  let cod = Number(
    (<HTMLInputElement>document.getElementById("codigo")).value.toString()
  );
  let nom = (<HTMLInputElement>(
    document.getElementById("nombre")
  )).value.toString();
  let eda = Number(
    (<HTMLInputElement>document.getElementById("edad")).value.toString()
  );
  let ciu = (<HTMLInputElement>(
    document.getElementById("ciudad")
  )).value.toString();
  img=imagen;
  if(validaciones(cod,nom,eda,ciu,img) &&  verificarCodigoRepetido(cod)==false){
    const op = new Heroe(cod, nom, eda, ciu,img);
    ListaHeroes.push(op);
    Listar();
    return true;
  }
  return false;
 
}

// Funcion Editar
export function Editar(codigo: number, imagen:string) {
  let cod = Number(
    (<HTMLInputElement>document.getElementById("codigo")).value.toString()
  );
  let nom = (<HTMLInputElement>(
    document.getElementById("nombre")
  )).value.toString();
  let eda = Number(
    (<HTMLInputElement>document.getElementById("edad")).value.toString()
  );
  let ciu = (<HTMLInputElement>(
    document.getElementById("ciudad")
  )).value.toString();
  let img= imagen;
  let index = ListaHeroes.findIndex((heroe) => heroe.Codigo === codigo);
  let heroeAux= ListaHeroes[index];
  if(img== null || img==""){
    img=heroeAux.Imagen as string;
  }
  let codigoRepetido= verificarCodigoRepetido(cod,index);
  if (index !== -1 && validaciones(cod,nom,eda,ciu,img) && codigoRepetido==false) {
    ListaHeroes[index] = new Heroe(cod, nom, eda, ciu, img);
    Listar();
    return true;
  }
  return false;
 
}

// Funcion Eliminar
export function Eliminar(codigo: number) {
  const index = ListaHeroes.findIndex((op) => op.Codigo === codigo);
  if (index >= 0) {
    ListaHeroes.splice(index, 1);
  }
  Listar();
}

// Funcion listar heroes
export function Listar() {
  let lis = "";
  let lista = <HTMLElement>document.getElementById("lista-h");
  for (let i = 0; i < ListaHeroes.length; i++) {
    lis =
      "<tr>" +
      lis +
      ` <td><img src=${ListaHeroes[i].Imagen} alt=""></td>`+
      "<td>" +
      ListaHeroes[i].Codigo +
      "</td>" +
      "<td>" +
      ListaHeroes[i].Nombre +
      "</td>" +
      "<td>" +
      ListaHeroes[i].Edad +
      "</td>" +
      "<td>" +
      ListaHeroes[i].Ciudad +
      "</td>" +
      ` <td class="action-buttons">
                          <button  class="editar">Editar</button>
                          <button  class="eliminar">Eliminar</button>
                      </td></tr>`;
  }
  lista.innerHTML = lis;
}

 function verificarCodigoRepetido(codigo: number,index?: number) {
 
  let elementoRepetido = ListaHeroes.find(
    (heroe: Heroe) => heroe.Codigo == codigo
  );

  if (
    elementoRepetido && typeof index == "number" &&
    ListaHeroes.indexOf(elementoRepetido) != index
  ) {
    window.alert("El codigo ya existe");
    return true;
  } else if (elementoRepetido && index == null) {
    window.alert("El codigo ya existe");
    return true;
  } else {
    return false;
  }
}

function validaciones(cod:number, nom:string, eda:number, ciu:string, img:string) {

    if( cod<1){
        window.alert("El codigo debe ser un numero y mayor a 0");
        return false;
    }

    if(eda<1){
        window.alert("Ingrese una edad válida");
        return false;
    }

    if(nom.length==0){
      window.alert("Introduzca un nombre");
      return false;
    }

    
    if(ciu.length==0){
        window.alert("Introduzca una ciudad");
        return false;
        
      }
    if(img==null || img.length==0){
        window.alert("Introduzca una imagen");
        return false;
      } 
      return true;

}
