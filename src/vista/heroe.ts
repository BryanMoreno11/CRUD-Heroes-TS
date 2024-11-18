import { Editar, Insertar, getHeroe } from "../Controlador/TLista";
import { Heroe } from "../Entidades/Heroe";
//region variables
let imagenUrl: string | ArrayBuffer | null;
let inputImagen = document.getElementById("inputImage") as HTMLInputElement;
let preview = document.getElementById("imagenPrevia") as HTMLImageElement;
let button = document.getElementById("btn") as HTMLButtonElement;
let heroe: Heroe | null = null;
let codigo: number | null;
//region eventos
codigo = Number(obtenerValorUrl("codigo"));
if (codigo) {
  heroe = getHeroe(codigo);
}

llenarFormulario();

button.addEventListener("click", save);

inputImagen.addEventListener("change", function (event) {
  const input = event.target as HTMLInputElement;
  if (input && input.files && input.files[0]) {
    var reader = new FileReader();
    reader.addEventListener(
      "load",
      function () {
        var src = reader.result;
        imagenUrl = src;
        preview.src = imagenUrl as string;
      },
      false
    );
    reader.readAsDataURL(input.files[0]);
  }
});

//region funciones

function save(e: Event): void {
  e.preventDefault();
  if (heroe) {
    let editar = Editar(heroe.Codigo, imagenUrl as string);
    if (editar) {
      window.location.href = "../index.html";
    }
  } else {
    let insertar = Insertar(imagenUrl as string);
    if (insertar) {
      window.location.href = "../index.html";
    }
  }
}

function obtenerValorUrl(nombreCampo: string) {
  const urlParams = new URLSearchParams(window.location.search);
  const valor = urlParams.get(nombreCampo);
  return valor;
}

function llenarFormulario() {
  if (heroe) {
    (<HTMLInputElement>document.getElementById("codigo")).value =
      heroe.Codigo.toString();
    (<HTMLInputElement>document.getElementById("nombre")).value = heroe.Nombre;
    (<HTMLInputElement>document.getElementById("edad")).value =
      heroe.Edad.toString();
    (<HTMLInputElement>document.getElementById("ciudad")).value =
      heroe.Ciudad.toString();
    preview.src = heroe.Imagen;
  }
}
