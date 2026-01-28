// ============================
// CLASE
// ============================
var SistemaEstudiantes = /** @class */ (function () {
    function SistemaEstudiantes() {
        this.estudiantes = [];
    }
    // Registrar estudiante
    SistemaEstudiantes.prototype.registrar = function (estudiante) {
        this.estudiantes.push(estudiante);
        console.log("✅ Estudiante registrado correctamente");
    };
    // Listar estudiantes
    SistemaEstudiantes.prototype.listar = function () {
        if (this.estudiantes.length === 0) {
            console.log("⚠️ No hay estudiantes registrados");
            return;
        }
        console.log("📋 Lista de estudiantes:");
        for (var _i = 0, _a = this.estudiantes; _i < _a.length; _i++) {
            var est = _a[_i];
            console.log("ID: ".concat(est.id, " | Nombre: ").concat(est.nombre, " | Edad: ").concat(est.edad, " | Carrera: ").concat(est.carrera, " | Activo: ").concat(est.activo));
        }
    };
    // Buscar estudiante por ID
    SistemaEstudiantes.prototype.buscarPorId = function (id) {
        return this.estudiantes.find(function (est) { return est.id === id; });
    };
    // Actualizar estudiante
    SistemaEstudiantes.prototype.actualizar = function (id, nuevosDatos) {
        var estudiante = this.buscarPorId(id);
        if (estudiante) {
            Object.assign(estudiante, nuevosDatos);
            console.log("✏️ Estudiante actualizado correctamente");
        }
        else {
            console.log("❌ Estudiante no encontrado");
        }
    };
    return SistemaEstudiantes;
}());
// ============================
// FUNCIONES
// ============================
function crearEstudiante(id, nombre, edad, carrera) {
    return {
        id: id,
        nombre: nombre,
        edad: edad,
        carrera: carrera,
        activo: true
    };
}
// ============================
// PROGRAMA PRINCIPAL
// ============================
var sistema = new SistemaEstudiantes();
// Datos de prueba
sistema.registrar(crearEstudiante(1, "Andrés", 18, "Ingeniería"));
sistema.registrar(crearEstudiante(2, "María", 20, "Medicina"));
sistema.registrar(crearEstudiante(3, "Juan", 19, "Derecho"));
sistema.listar();
// Buscar estudiante
var buscado = sistema.buscarPorId(2);
if (buscado) {
    console.log("🔍 Estudiante encontrado:", buscado);
}
else {
    console.log("❌ Estudiante no encontrado");
}
// Actualizar estudiante
sistema.actualizar(3, { edad: 21, activo: false });
// Listar nuevamente
sistema.listar();
