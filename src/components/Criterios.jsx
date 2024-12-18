import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import PropTypes from "prop-types";

function Criterios({ idClase}) {
	const [criterios, setCriterios] = useState([]);
	const { register, handleSubmit, reset } = useForm();
	const [editingCriterio, setEditingCriterio] = useState(null);

	// Obtener los criterios al cargar el componente
	useEffect(() => {
		fetchCriterios();
	}, [idClase]);

	const fetchCriterios = async () => {
		try {
			const response = await fetch(`/api/clases/${idClase}/criterios`);
			const data = await response.json();
			setCriterios(data);
		} catch (error) {
			console.error("Error al obtener los criterios", error);
		}
	};

	const onSubmit = async (data) => {
		const url = editingCriterio
			? `/api/clases/${idClase}/criterios/${editingCriterio._id}`
			: `/api/clases/${idClase}/criterios`;

		const method = editingCriterio ? "PUT" : "POST";

		try {
			const response = await fetch(url, {
				method,
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(data),
			});

			if (response.ok) {
				fetchCriterios();
				reset();
				setEditingCriterio(null);
			}
		} catch (error) {
			console.error("Error al guardar el criterio", error);
		}
	};

	const deleteCriterio = async (id) => {
		try {
			await fetch(`/api/clases/${idClase}/criterios/${id}`, {
				method: "DELETE",
			});
			fetchCriterios();
		} catch (error) {
			console.error("Error al eliminar el criterio", error);
		}
	};

	const startEdit = (criterio) => {
		setEditingCriterio(criterio);
		reset(criterio);
	};

	return (
		<div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-md">
			<h2 className="text-xl font-semibold mb-4">Criterios</h2>

			<form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
				<input
					type="text"
					placeholder="Nombre del criterio"
					className="w-full p-2 border rounded"
					{...register("nombre", { required: true })}
				/>
				<input
					type="number"
					placeholder="Puntuación"
					className="w-full p-2 border rounded"
					{...register("puntuacion", { required: true })}
				/>

				<button
					type="submit"
					className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
				>
					{editingCriterio ? "Actualizar Criterio" : "Agregar Criterio"}
				</button>
			</form>

			<ul className="mt-4">
				{criterios.map((criterio) => (
					<li
						key={criterio._id}
						className="flex justify-between items-center p-2 border-b"
					>
						<span>
							{criterio.nombre} - {criterio.puntuacion}
						</span>
						<div>
							<button
								className="bg-yellow-500 hover:bg-yellow-600 text-white px-2 py-1 rounded mr-2"
								onClick={() => startEdit(criterio)}
							>
								Editar
							</button>
							<button
								className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
								onClick={() => deleteCriterio(criterio._id)}
							>
								Eliminar
							</button>
						</div>
					</li>
				))}
			</ul>
		</div>
	);
}

Criterios.propTypes = {
	idClase: PropTypes.string.isRequired,
};

export default Criterios;
