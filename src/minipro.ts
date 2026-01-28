
interface Estudiante {
  id: number;
  nombre: string;
  edad: number;
  carrera: string;
  activo: boolean;
}

class SistemaEstudiantes {
  private estudiantes: Estudiante[] = [];

 
  registrar(estudiante: Estudiante): void {
    this.estudiantes.push(estudiante);
    console.log(" Estudiante registrado correctamente");
  }

 
  listar(): void {
    if (this.estudiantes.length === 0) {
      console.log(" No hay estudiantes registrados");
      return;
    }

    console.log(" Lista de estudiantes:");
    for (const est of this.estudiantes) {
      console.log(
        `ID: ${est.id} | Nombre: ${est.nombre} | Edad: ${est.edad} | Carrera: ${est.carrera} | Activo: ${est.activo}`
      );
    }
  }


  buscarPorId(id: number): Estudiante | undefined {
    return this.estudiantes.find(est => est.id === id);
  }

  actualizar(id: number, nuevosDatos: Partial<Estudiante>): void {
    const estudiante = this.buscarPorId(id);

    if (estudiante) {
      Object.assign(estudiante, nuevosDatos);
      console.log(" Estudiante actualizado correctamente");
    } else {
      console.log(" Estudiante no encontrado");
    }
  }
}


function crearEstudiante(
  id: number,
  nombre: string,
  edad: number,
  carrera: string
): Estudiante {
  return {
    id,
    nombre,
    edad,
    carrera,
    activo: true
  };
}


const sistema = new SistemaEstudiantes();


sistema.registrar(crearEstudiante(1, "Andrés", 18, "Ingeniería"));
sistema.registrar(crearEstudiante(2, "María", 20, "Medicina"));
sistema.registrar(crearEstudiante(3, "Juan", 19, "Derecho"));

sistema.listar();

const buscado = sistema.buscarPorId(2);
if (buscado) {
  console.log(" Estudiante encontrado:", buscado);
} else {
  console.log(" Estudiante no encontrado");
}

sistema.actualizar(3, { edad: 21, activo: false });

sistema.listar();
