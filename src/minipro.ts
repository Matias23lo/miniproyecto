

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
    // Validar ID repetido
    for (let e of this.estudiantes) {
      if (e.id === est.id) {
        return { ok: false, mensaje: "ID repetido" };
      }
    }

    // Validar edad
    if (est.edad < 15 || est.edad > 80) {
      return { ok: false, mensaje: "Edad inválida" };
    }

    // Validar promedio
    if (est.promedio < 0 || est.promedio > 10) {
      return { ok: false, mensaje: "Promedio inválido" };
    }

    this.estudiantes.push(est);
    return { ok: true, mensaje: "Estudiante agregado", data: est };
  }

  listar(): Estudiante[] {
    let lista: Estudiante[] = [];
    for (let e of this.estudiantes) {
      lista.push(e);
    }
    return lista;
  }

  buscarPorId(id: number): IResultado<Estudiante> {
    for (let e of this.estudiantes) {
      if (e.id === id) {
        return { ok: true, mensaje: "Estudiante encontrado", data: e };
      }
    }
    return { ok: false, mensaje: "Estudiante no encontrado" };
  }

  actualizarPromedio(id: number, nuevoPromedio: number): IResultado<Estudiante> {
    if (nuevoPromedio < 0 || nuevoPromedio > 10) {
      return { ok: false, mensaje: "Promedio inválido" };
    }

    for (let e of this.estudiantes) {
      if (e.id === id) {
        e.promedio = nuevoPromedio;
        return { ok: true, mensaje: "Promedio actualizado", data: e };
      }
    }
    return { ok: false, mensaje: "Estudiante no encontrado" };
  }

  cambiarEstado(id: number, activo: boolean): IResultado<Estudiante> {
    for (let e of this.estudiantes) {
      if (e.id === id) {
        e.activo = activo;
        return { ok: true, mensaje: "Estado actualizado", data: e };
      }
    }
    return { ok: false, mensaje: "Estudiante no encontrado" };
  }

  listarActivos(): Estudiante[] {
    let activos: Estudiante[] = [];
    for (let e of this.estudiantes) {
      if (e.activo) {
        activos.push(e);
      }
    }
    return activos;
  }

  promedioGeneral(): number {
    if (this.estudiantes.length === 0) return 0;

    let suma = 0;
    for (let e of this.estudiantes) {
      suma += e.promedio;
    }
    return suma / this.estudiantes.length;
  }
}



function mostrarMenu(): void {
  console.log("===== SISTEMA DE ESTUDIANTES =====");
  console.log("1. Agregar estudiante");
  console.log("2. Listar estudiantes");
  console.log("3. Buscar por ID");
  console.log("4. Actualizar promedio");
  console.log("5. Cambiar estado");
  console.log("6. Listar activos");
  console.log("7. Promedio general");
  console.log("=================================");
}

function ejecutarDemo(sistema: SistemaEstudiantes): void {
  console.log("\n--- EJECUTANDO DEMO ---\n");

  sistema.agregar(new Estudiante(1, "Ana", 20, "Ingeniería", true, 8.5));
  sistema.agregar(new Estudiante(2, "Luis", 22, "Medicina", false, 7.8));
  sistema.agregar(new Estudiante(3, "Carlos", 19, "Derecho", true, 9.2));

  console.log("Listado total:");
  console.log(sistema.listar());

  console.log("\nBuscar ID 2:");
  console.log(sistema.buscarPorId(2));

  console.log("\nActualizar promedio ID 1:");
  console.log(sistema.actualizarPromedio(1, 9.1));

  console.log("\nCambiar estado ID 2:");
  console.log(sistema.cambiarEstado(2, true));

  console.log("\nEstudiantes activos:");
  console.log(sistema.listarActivos());

  console.log("\nPromedio general:");
  console.log(sistema.promedioGeneral());
}


const sistema = new SistemaEstudiantes();
mostrarMenu();
ejecutarDemo(sistema);
