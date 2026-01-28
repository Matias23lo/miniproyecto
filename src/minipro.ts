interface IEstudiante {
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
  promedio: number;
}

interface IResultado<T> {
  ok: boolean;
  mensaje: string;
  data?: T;
}

class Estudiante implements IEstudiante {
  constructor(
    public id: number,
    public nombre: string,
    public edad: number,
    public carrera: string,
    public activo: boolean,
    public promedio: number
  ) {}
}

class SistemaEstudiantes {
  private estudiantes: Estudiante[] = [];

  agregar(est: Estudiante): IResultado<Estudiante> {
    this.estudiantes.push(est);
    return { ok: true, mensaje: "Agregado", data: est };
  }

  listar(): Estudiante[] {
    return this.estudiantes;
  }

  buscarPorId(id: number): IResultado<Estudiante> {
    for (let e of this.estudiantes) {
      if (e.id === id) {
        return { ok: true, mensaje: "Encontrado", data: e };
      }
    }
    return { ok: false, mensaje: "No encontrado" };
  }

  actualizarPromedio(id: number, nuevo: number): IResultado<Estudiante> {
    for (let e of this.estudiantes) {
      if (e.id === id) {
        e.promedio = nuevo;
        return { ok: true, mensaje: "Actualizado", data: e };
      }
    }
    return { ok: false, mensaje: "No encontrado" };
  }

  cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> {
    for (let e of this.estudiantes) {
      if (e.id === id) {
        e.activo = activo;
        return { ok: true, mensaje: "Estado cambiado", data: e };
      }
    }
    return { ok: false, mensaje: "No encontrado" };
  }

  listarActivos(): Estudiante[] {
    let activos: Estudiante[] = [];
    for (let e of this.estudiantes) {
      if (e.activo) activos.push(e);
    }
    return activos;
  }

  promedioGeneral(): number {
    let suma = 0;
    for (let e of this.estudiantes) suma += e.promedio;
    return suma / this.estudiantes.length;
  }
}

function ejecutarDemo(sistema: SistemaEstudiantes): void {
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
