import PropTypes from "prop-types";

function AlumnosTable({ alumnos, handleEditAlumno, deleteAlumno }) {
  return (
    <table className="w-full table-auto border-collapse border border-border mt-4 shadow-md dark:border-darkBorder">
      <thead>
        <tr className="bg-primary dark:bg-darkPrimary text-white">
          <th className="border border-gray-300 px-4 py-2">#</th>
          <th className="border border-gray-300 px-4 py-2">Nombre</th>
          <th className="border border-gray-300 px-4 py-2">Apellido</th>
          <th className="border border-gray-300 px-4 py-2">Matrícula</th>
          <th className="border border-gray-300 px-4 py-2">Acciones</th>
        </tr>
      </thead>
      <tbody>
        {alumnos.map((alumno, index) => (
          <tr
            key={alumno.id}
            className="text-center hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
            <td className="border border-gray-300 px-4 py-2">
              {alumno.nombre}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {alumno.apellido}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              {alumno.matricula}
            </td>
            <td className="border border-gray-300 px-4 py-2">
              <button
                className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
                onClick={() => handleEditAlumno(alumno)}
              >
                Editar
              </button>
              <button
                className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
                onClick={() => {
                  deleteAlumno(alumno._id);
                }}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

AlumnosTable.propTypes = {
	alumnos: PropTypes.any,
	handleEditAlumno: PropTypes.any,
	deleteAlumno: PropTypes.any,
};

export default AlumnosTable;
