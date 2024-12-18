import { useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";
import { useClases } from "../../context/ClasesContext";
import { useParciales } from "../../context/ParcialesContext";

function ParcialModal({ onClose, titulo, parcial }) {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm();
	const {
		createParcial,
		updateParcial,
		errors: parcialErrors,
		parciales,
	} = useParciales();
	const { idClase } = useClases();

	useEffect(() => {
		if (parcial) {
			reset(parcial);
		}
	}, [parciales, parcial, reset]);

	const onSubmit = handleSubmit(async (values) => {
		const parcialConClase = {
			...values,
			clase: idClase,
		};

		let success;
		if (parcial) {
			// Actualizar
			success = await updateParcial(parcialConClase);
		} else {
			// Registrar
			success = await createParcial(parcialConClase);
		}

		if (success) {
			onClose(); // Cierra el modal si fue exitoso
		}
	});

	return (
		<div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
			<div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg">
				<h2 className="text-2xl font-bold mb-4 text-center text-gray-700 dark:text-gray-200">
					{titulo} Parcial
				</h2>
				{parcialErrors.map((error, i) => (
					<div className="bg-red-500 p-2 my-2 text-white" key={i}>
						{error}
					</div>
				))}
				<form onSubmit={onSubmit} className="space-y-4">
					<input
						type="text"
						placeholder="Nombre del parcial"
						className="w-full p-2 border rounded"
						{...register("nombre", { required: true })}
					/>
					{errors.nombre && (
						<p className="text-red-500">El nombre es obligatorio</p>
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
ParcialModal.propTypes = {
	onClose: PropTypes.func.isRequired,
	titulo: PropTypes.string.isRequired,
	parcial: PropTypes.object,
};

export default ParcialModal;
