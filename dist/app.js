"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const readline_1 = __importDefault(require("readline"));
class Estudiante {
    constructor(id, nombre, edad, carrera, activo, promedio) {
        this.id = id;
        this.nombre = nombre;
        this.edad = edad;
        this.carrera = carrera;
        this.activo = activo;
        this.promedio = promedio;
    }
}
class SistemaEstudiantes {
    constructor() {
        this.estudiantes = [];
    }
    agregar(est) {
        const existe = this.estudiantes.find(e => e.id === est.id);
        if (existe) {
            return { ok: false, mensaje: "Estudiante con ID ya existe" };
        }
        this.estudiantes.push(est);
        return { ok: true, mensaje: "Estudiante agregado correctamente", data: est };
    }
    listar() {
        return this.estudiantes;
    }
    buscarPorId(id) {
        const encontrado = this.estudiantes.find(e => e.id === id);
        if (encontrado) {
            return { ok: true, mensaje: "Estudiante encontrado", data: encontrado };
        }
        return { ok: false, mensaje: "Estudiante no encontrado" };
    }
    cambiarEstado(id, activo) {
        const encontrado = this.estudiantes.find(e => e.id === id);
        if (encontrado) {
            encontrado.activo = activo;
            return { ok: true, mensaje: "Estado actualizado", data: encontrado };
        }
        return { ok: false, mensaje: "Estudiante no encontrado" };
    }
    promedioGeneral() {
        if (this.estudiantes.length === 0)
            return 0;
        const suma = this.estudiantes.reduce((acc, e) => acc + e.promedio, 0);
        return suma / this.estudiantes.length;
    }
}
// ============================
// INTERACCIÓN EN TERMINAL
// ============================
const rl = readline_1.default.createInterface({
    input: process.stdin,
    output: process.stdout
});
const sistema = new SistemaEstudiantes();
function preguntar(pregunta) {
    return new Promise(resolve => {
        rl.question(pregunta, respuesta => resolve(respuesta));
    });
}
async function iniciar() {
    let opcion = -1;
    while (opcion !== 0) {
        console.log("\n===== MENÚ =====");
        console.log("1. Agregar estudiante");
        console.log("2. Listar estudiantes");
        console.log("3. Buscar por ID");
        console.log("4. Cambiar estado");
        console.log("5. Promedio general");
        console.log("0. Salir");
        opcion = Number(await preguntar("Seleccione una opción: "));
        switch (opcion) {
            case 1:
                const id = Number(await preguntar("ID: "));
                const nombre = await preguntar("Nombre: ");
                const edad = Number(await preguntar("Edad: "));
                const carrera = await preguntar("Carrera: ");
                const promedio = Number(await preguntar("Promedio: "));
                const nuevo = new Estudiante(id, nombre, edad, carrera, true, promedio);
                console.log(sistema.agregar(nuevo).mensaje);
                break;
            case 2:
                const lista = sistema.listar();
                if (lista.length === 0) {
                    console.log("⚠ No hay estudiantes registrados");
                }
                else {
                    console.table(lista);
                }
                break;
            case 3:
                const idBuscar = Number(await preguntar("Ingrese ID a buscar: "));
                console.log(sistema.buscarPorId(idBuscar));
                break;
            case 4:
                const idEstado = Number(await preguntar("Ingrese ID: "));
                const estado = await preguntar("¿Activar? (true/false): ");
                console.log(sistema.cambiarEstado(idEstado, estado.toLowerCase() === "true"));
                break;
            case 5:
                console.log(" Promedio general:", sistema.promedioGeneral());
                break;
            case 0:
                console.log(" Saliendo del sistema...");
                break;
            default:
                console.log(" Opción inválida");
        }
    }
    rl.close();
}
console.log("🚀 Sistema de Estudiantes Iniciado");
iniciar();
