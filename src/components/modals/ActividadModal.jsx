import PropTypes from "prop-types";
import { useForm } from "react-hook-form";
import { useClases } from "../../context/ClasesContext";
import { useActividad } from "../../context/ActividadContext";
import { useEffect } from "react";
import { useParciales } from "../../context/ParcialesContext";
import { useCriterios } from "../../context/CriteriosContext";

function ActividadModal({ onClose, titulo, actividad }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const {
		createActividad,
		updateActividad,
		errors: actividadErrors,
	} = useActividad();
	const { idClase } = useClases();
	const { parciales } = useParciales(); // Obtener parciales del contexto
	const { criterios } = useCriterios(); // Obtener criterios del contexto

	// Función para formatear fecha a dd/MM/yyyy
	const formatFecha = (fecha) => {
		const date = new Date(fecha);
		return date.toLocaleDateString("es-MX");
	};

	// Enviar los datos del formulario
	const onSubmit = handleSubmit(async (values) => {
		values.fecha_entrega = formatFecha(values.fecha_entrega);

		const actividadActualizada = {
			...values,
			clase: idClase,
		};

		console.log(actividadActualizada);

		let success;
		if (actividad) {
			// Actualizar actividad existente
			success = await updateActividad(actividadActualizada);
		} else {
			// Registrar nueva actividad
			success = await createActividad(actividadActualizada);
		}

		if (success) {
			onClose(); // Cierra el modal si fue exitoso
		}
	});

	// Cargar datos de la actividad en el formulario al abrir el modal
	useEffect(() => {
		if (actividad) {
			// Convierte la fecha de entrega a formato yyyy-MM-dd
			const fechaFormateada = new Date(actividad.fecha_entrega)
				.toISOString()
				.split("T")[0];

			// Rellena los campos con los datos de la actividad
			reset({
				...actividad,
				fecha_entrega: fechaFormateada, // Asegúrate de formatear la fecha
				parcial: actividad.parcial?._id || "", // Asegúrate de asignar el ID del parcial
				criterio: actividad.criterio?._id || "", // Asegúrate de asignar el ID del criterio
			});
		}
	}, [actividad, reset]);

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
				<h2 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-gray-200">
					{titulo} Actividad
				</h2>
				{actividadErrors.map((error, i) => (
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
						<p className="text-red-500">El nombre es obligatoria</p>
					)}

					{/* Descripción */}
					<input
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						placeholder="Descripción"
						{...register("descripcion", { required: true })}
					/>

					{errors.descripcion && (
						<p className="text-red-500">La descripción es obligatoria</p>
					)}

					{/* Fecha de entrega */}
					<input
						type="date"
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						{...register("fecha_entrega", { required: true })}
					/>
					{errors.fecha_entrega && (
						<p className="text-red-500">La fecha de entrega es obligatoria</p>
					)}

					{/* Selección de Parcial */}
					<select
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						{...register("parcial", { required: true })}
					>
						<option value="">Selecciona un parcial</option>
						{parciales.map((parcial) => (
							<option key={parcial._id} value={parcial._id}>
								{parcial.nombre}
							</option>
						))}
					</select>
					{errors.parcial && (
						<p className="text-red-500">Debes seleccionar un parcial</p>
					)}

					{/* Selección de Criterio */}
					<select
						className="w-full bg-gray-200 text-gray-800 px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-gray-200 dark:border-gray-600"
						{...register("criterio", { required: true })}
					>
						<option value="">Selecciona un criterio</option>
						{criterios.map((criterio) => (
							<option key={criterio._id} value={criterio._id}>
								{criterio.nombre}
							</option>
						))}
					</select>
					{errors.criterio && (
						<p className="text-red-500">Debes seleccionar un criterio</p>
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

ActividadModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	titulo: PropTypes.string.isRequired,
	actividad: PropTypes.object,
};

export default ActividadModal;
