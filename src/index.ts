import { Listar, Insertar, Editar, Eliminar } from "../src/Controlador/TLista";
Listar();
//region variables
const tabla = document.getElementById("tabla-H") as HTMLTableElement;
const modal = document.getElementById("container-form");
let button = document.getElementById("btn") as HTMLButtonElement;
let buttonAdd = document.getElementById("btn-add") as HTMLButtonElement;
let inputImagen = document.getElementById("inputImage") as HTMLInputElement;
let preview = document.getElementById("imagenPrevia") as HTMLImageElement;
let primerValor = 0;
let opcion = "";
let imagenUrl:string | ArrayBuffer| null;
//region Eventos
button.addEventListener("click", save);
buttonAdd.addEventListener("click", openModal);

inputImagen.addEventListener('change', function(event) {
  const input = event.target as HTMLInputElement;
  if (input && input.files && input.files[0]) {
      var reader = new FileReader()
      reader.addEventListener(
          "load",
          function() {
              var src = reader.result;
             imagenUrl = src;
             preview.src = imagenUrl as string;
          },
          false
      );
      reader.readAsDataURL(input.files[0]);
  }
});


//region Funciones
function openModal() {
  if (modal) {
    modal.classList.add("active");
    console.log("Abrir modal");
    modal.onclick = (event: Event) => {
      const target = event.target as HTMLDivElement;
      console.log("El target es: ", target);
      if (target.className.indexOf("container-form") !== -1 || target.className.indexOf("close") !== -1) {
        modal.classList.remove("active");
        primerValor = 0;
        limpiar();
        opcion = "";
      }
    };
  }
}

//funcion limpiar campos
function limpiar() {
  (<HTMLInputElement>document.getElementById("codigo")).value = "";
  (<HTMLInputElement>document.getElementById("nombre")).value = "";
  (<HTMLInputElement>document.getElementById("edad")).value = "";
  (<HTMLInputElement>document.getElementById("ciudad")).value = "";
  (<HTMLInputElement>document.getElementById("inputImage")).value = "";
  imagenUrl="";
  preview.src = "";
}

//Función para guardar en el formulario
function save(e: Event): void {
  e.preventDefault();
  if (opcion == "editar") {
  let editar=Editar(primerValor, imagenUrl as string);
  if(editar){
    primerValor = 0;
    limpiar();
    opcion = "";
    if (modal) {
    modal.classList.remove("active");
    }
  }
    
  } else {
    let insertar=Insertar(imagenUrl as string);
    if(insertar){
      primerValor = 0;
      limpiar();
      if (modal) {
        modal.classList.remove("active");
        }
    }
    
  }

}

//Se obtiene el codigo para editar
tabla.addEventListener("click", (event) => {

  const target = event.target as HTMLButtonElement;
  let parent = target.parentNode?.parentNode;
  if (target.classList.contains("editar") && parent) {
    openModal();
    const fila = parent;
    primerValor = Number(fila.children[1].innerHTML);
    opcion = "editar";
    (<HTMLInputElement>document.getElementById("codigo")).value =
      fila.children[1].innerHTML;
    (<HTMLInputElement>document.getElementById("nombre")).value =
      fila.children[2].innerHTML;
    (<HTMLInputElement>document.getElementById("edad")).value =
      fila.children[3].innerHTML;
    (<HTMLInputElement>document.getElementById("ciudad")).value =
      fila.children[4].innerHTML;
      const imgElement = fila.children[0].querySelector("img") as HTMLImageElement;
      if (imgElement) {
        preview.src = imgElement.src;
      }
  }
});

//Funcion Eliminar
tabla.addEventListener("click", (event) => {
  const target = event.target as HTMLButtonElement;
  let parent = target.parentNode?.parentNode;
  if (target.classList.contains("eliminar") && parent) {
    const fila = parent;
    primerValor = Number(fila.children[1].innerHTML);
    Eliminar(primerValor);
    primerValor = 0;
  }
});
