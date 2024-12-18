import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useClases } from "../../context/ClasesContext";

function ClaseModal({ onClose, clase }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const { createClase, updateClase, errors: claseErrors } = useClases();
	const [diasSeleccionados, setDiasSeleccionados] = useState([]);

	const handleDiasChange = (e) => {
		const { value, checked } = e.target;
		setDiasSeleccionados((prev) =>
			checked ? [...prev, value] : prev.filter((dia) => dia !== value)
		);
	};

	// Función para formatear fecha a dd/MM/yyyy
	const formatFecha = (fecha) => {
		const date = new Date(fecha);
		return date.toLocaleDateString("es-MX");
	};

	// Cargar datos de la actividad en el formulario al abrir el modal
	useEffect(() => {
		if (clase) {
			// Formatear fechas para los inputs tipo 'date'
			const fechaInicio = clase.fecha_inicio
				? new Date(clase.fecha_inicio).toISOString().split("T")[0]
				: "";
			const fechaFin = clase.fecha_fin
				? new Date(clase.fecha_fin).toISOString().split("T")[0]
				: "";

			// Establecer los días seleccionados
			setDiasSeleccionados(clase.dias || []);

			// Rellenar el formulario con los datos recibidos
			reset({
				nombre: clase.nombre || "",
				descripcion: clase.descripcion || "",
				fecha_inicio: fechaInicio,
				fecha_fin: fechaFin,
				hora_inicio: clase.hora_inicio || "",
				hora_fin: clase.hora_fin || "",
			});
		}
	}, [clase, reset]);

	const onSubmit = handleSubmit((values) => {
		// Formatear fechas
		values.fecha_inicio = formatFecha(values.fecha_inicio);
		values.fecha_fin = formatFecha(values.fecha_fin);
		values.dias = diasSeleccionados;

		if (clase) {

			const claseActualizada = {
				...values,
				_id: clase._id,
			};

			// Si hay una clase (editando), actualizamos
			updateClase(claseActualizada); // Asegúrate de tener el `id` de la clase
		} else {
			// Si no hay clase (creando nueva)
			createClase(values);
		}
		onClose();
	});

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
				<h2 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-gray-200">
					Registrar Clase
				</h2>
				{claseErrors.map((error, i) => (
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

					{/* Descripción */}
					<textarea
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						placeholder="Descripción"
						{...register("descripcion")}
					/>

					{/* Fecha de inicio */}
					<input
						type="date"
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						{...register("fecha_inicio", { required: true })}
					/>
					{errors.fecha_inicio && (
						<p className="text-red-500">La fecha de inicio es obligatoria</p>
					)}

					{/* Fecha de fin */}
					<input
						type="date"
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						{...register("fecha_fin", { required: true })}
					/>
					{errors.fecha_fin && (
						<p className="text-red-500">La fecha de fin es obligatoria</p>
					)}

					{/* Hora de inicio */}
					<input
						type="time"
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						{...register("hora_inicio", { required: true })}
					/>
					{errors.hora_inicio && (
						<p className="text-red-500">La hora de inicio es obligatoria</p>
					)}

					{/* Hora de fin */}
					<input
						type="time"
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						{...register("hora_fin", { required: true })}
					/>
					{errors.hora_fin && (
						<p className="text-red-500">La hora de fin es obligatoria</p>
					)}

					{/* Días */}
					<div>
						<p className="font-semibold text-gray-700 dark:text-gray-200">
							Días:
						</p>
						{[
							"Lunes",
							"Martes",
							"Miércoles",
							"Jueves",
							"Viernes",
							"Sábado",
							"Domingo",
						].map((dia) => (
							<label key={dia} className="inline-flex items-center mr-4">
								<input
									type="checkbox"
									value={dia}
									checked={diasSeleccionados.includes(dia)}
									onChange={handleDiasChange}
									className="form-checkbox text-blue-500 border-gray-300 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-700"
								/>
								<span className="ml-2 text-gray-800 dark:text-gray-200">
									{dia}
								</span>
							</label>
						))}
					</div>

					<div className="flex justify-between items-center pt-4">
						<button
							type="button"
							onClick={onClose}
							className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
						>
							Cancelar
						</button>
						<button
							type="submit"
							className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
						>
							Guardar
						</button>
					</div>
				</form>
			</div>
		</div>
	);
}

export default ClaseModal;

ClaseModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	clase: PropTypes.any,
};
