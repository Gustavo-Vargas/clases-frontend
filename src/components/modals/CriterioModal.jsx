import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useClases } from "../../context/ClasesContext";
import { useCriterios } from "../../context/CriteriosContext";

function CriterioModal({ onClose, titulo, criterio }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const {
		createCriterio,
		updateCriterio,
		errors: criterioErrors,
		criterios,
	} = useCriterios();
	const { idClase } = useClases();
	const [maxPorcentaje, setMaxPorcentaje] = useState(100);

	// Calcular el porcentaje máximo permitido al abrir el modal
	useEffect(() => {
		const totalActual = criterios.reduce(
			(total, crit) => total + crit.porcentaje,
			0
		);
		setMaxPorcentaje(100 - totalActual + (criterio ? criterio.porcentaje : 0));

		if (criterio) {
			reset(criterio);
		}
	}, [criterios, criterio, reset]);

	const onSubmit = handleSubmit(async (values) => {
		const porcentaje = Number(values.porcentaje);
		if (porcentaje < 1 || porcentaje > maxPorcentaje) {
			alert(`El porcentaje debe estar entre 1 y ${maxPorcentaje}`);
			return;
		}

		const criterioConClase = {
			...values,
			clase: idClase,
		};
		console.log("Datos", criterioConClase);

		let success;
		if (criterio) {
			// Actualizar
			success = await updateCriterio(criterioConClase);
		} else {
			// Registrar
			success = await createCriterio(criterioConClase);
		}

		if (success) {
			onClose(); // Cierra el modal si fue exitoso
		}
	});

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
				<h2 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-gray-200">
					{titulo} Criterio
				</h2>
				{criterioErrors.map((error, i) => (
					<div className="bg-red-500 p-2 my-2 text-white" key={i}>
						{error}
					</div>
				))}
				<form onSubmit={onSubmit} className="space-y-4">
					<input
						type="text"
						placeholder="Nombre del criterio"
						className="w-full p-2 border rounded"
						{...register("nombre", { required: true })}
					/>
					{errors.nombre && (
						<p className="text-red-500">El nombre es obligatorio</p>
					)}
					<input
						type="number"
						placeholder={`Porcentaje (máx: ${maxPorcentaje})`}
						className="w-full p-2 border rounded"
						{...register("porcentaje", {
							required: true,
							min: 1,
							max: maxPorcentaje,
							valueAsNumber: true,
						})}
					/>
					{errors.porcentaje && (
						<p className="text-red-500">
							El porcentaje debe estar entre 1 y {maxPorcentaje}
						</p>
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
CriterioModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	titulo: PropTypes.string.isRequired,
	criterio: PropTypes.object,
};

export default CriterioModal;
