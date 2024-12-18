import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useAlumnos } from "../../context/AlumnosContext";
import { useClases } from "../../context/ClasesContext";

function AlumnoModal({ onClose, titulo, alumno }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { createAlumno, updateAlumno, errors: alumnoErrors } = useAlumnos();
	const { idClase } = useClases();

	// Cargar datos del alumno en el formulario al abrir el modal
	useEffect(() => {
		if (alumno) {
			reset(alumno); // Rellena los campos con los datos del alumno
		}
	}, [alumno, reset]);

	const onSubmit = handleSubmit(async (values) => {
		const alumnoConClase = {
			...values,
			clase: idClase,
		};

		let success;
		if (alumno) {
			// Actualizar
			success = await updateAlumno(alumnoConClase);
		} else {
			// Registrar
			success = await createAlumno(alumnoConClase);
		}

		if (success) {
			onClose(); // Cierra el modal si fue exitoso
		}
	});

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
				<h2 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-gray-200">
					{titulo} Alumno
				</h2>
				{alumnoErrors.map((error, i) => (
					<div className="bg-red-500 p-2 my-2 text-white" key={i}>
						{error}
					</div>
				))}
				<form onSubmit={onSubmit} className="space-y-4">
					{/* Nombre */}
					<input
						type="text"
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						placeholder="Nombre"
						{...register("nombre", { required: true })}
					/>
					{errors.nombre && (
						<p className="text-red-500">El nombre es obligatorio</p>
					)}

					{/* Apellido */}
					<input
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						placeholder="Apellido"
						{...register("apellido", { required: true })}
					/>
					{errors.nombre && (
						<p className="text-red-500">El apellido es obligatorio</p>
					)}

					{/* Matrícula */}
					<input
						type="number"
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border 
                                border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 
                                dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						placeholder="Matrícula"
						{...register("matricula", { required: true, valueAsNumber: true })}
					/>
					{errors.matricula && (
						<p className="text-red-500">La matrícula es obligatoria</p>
					)}

					<div className="flex justify-between items-center pt-4">
						<button
							type="button"
							className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
							onClick={onClose}
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
						>
							Guardar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

// Proptypes
AlumnoModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	titulo: PropTypes.string.isRequired,
	alumno: PropTypes.object,
};

export default AlumnoModal;
