"use strict";
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
        this.estudiantes.push(est);
        return { ok: true, mensaje: "Agregado", data: est };
    }
    listar() {
        return this.estudiantes;
    }
    buscarPorId(id) {
        for (let e of this.estudiantes) {
            if (e.id === id) {
                return { ok: true, mensaje: "Encontrado", data: e };
            }
        }
        return { ok: false, mensaje: "No encontrado" };
    }
    actualizarPromedio(id, nuevo) {
        for (let e of this.estudiantes) {
            if (e.id === id) {
                e.promedio = nuevo;
                return { ok: true, mensaje: "Actualizado", data: e };
            }
        }
        return { ok: false, mensaje: "No encontrado" };
    }
    cambiarEstado(id, activo) {
        for (let e of this.estudiantes) {
            if (e.id === id) {
                e.activo = activo;
                return { ok: true, mensaje: "Estado cambiado", data: e };
            }
        }
        return { ok: false, mensaje: "No encontrado" };
    }
    listarActivos() {
        let activos = [];
        for (let e of this.estudiantes) {
            if (e.activo)
                activos.push(e);
        }
        return activos;
    }
    promedioGeneral() {
        let suma = 0;
        for (let e of this.estudiantes)
            suma += e.promedio;
        return suma / this.estudiantes.length;
    }
}
function ejecutarDemo(sistema) {
    console.log("===== DEMO =====");
    sistema.agregar(new Estudiante(1, "Ana", 20, "Ing.", true, 8.5));
    sistema.agregar(new Estudiante(2, "Luis", 22, "Med.", true, 7.8));
    sistema.agregar(new Estudiante(3, "Carlos", 19, "Der.", true, 9.2));
    console.log("Todos:");
    console.log(sistema.listar());
    console.log("Buscar ID 2:");
    console.log(sistema.buscarPorId(2));
    console.log("Actualizar promedio:");
    console.log(sistema.actualizarPromedio(1, 9));
    console.log("Cambiar estado:");
    console.log(sistema.cambiarEstado(2, false));
    console.log("Activos:");
    console.log(sistema.listarActivos());
    console.log("Promedio general:");
    console.log(sistema.promedioGeneral());
}
console.log("INICIO DEL PROGRAMA");
const sistema = new SistemaEstudiantes();
ejecutarDemo(sistema);
console.log("FIN DEL PROGRAMA");
