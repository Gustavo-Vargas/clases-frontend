import PropTypes from "prop-types";
import { useAlumnos } from "../context/AlumnosContext";
import { useEffect, useState } from "react";
import { useClases } from "../context/ClasesContext";
import { useCalifActiv } from "../context/CalifActivContext";
import { useCalifParcial } from "../context/CalifParcialContext";

function ListActivCalifs({ actividad }) {
	// Definir el estado de calificaciones
	const [calificaciones, setCalificaciones] = useState({});
	const { alumnos, getAlumnos } = useAlumnos();
	const { idClase } = useClases();
	const {
		createCalifActividad,
		getCalifActividad,
		listCalif,
		updateCalifActividad,
	} = useCalifActiv();

	const { createCalifParcial } = useCalifParcial();

	// Traer los alumnos cuando el componente se monta
	useEffect(() => {
		getAlumnos();
		getCalifActividad(actividad._id);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Actualizar calificaciones cuando listCalif o alumnos cambien
	useEffect(() => {
		if (listCalif.length && alumnos.length) {
			const nuevasCalificaciones = {};
			alumnos.forEach((alumno) => {
				// Buscar si el alumno tiene una calificación en listCalif
				const califEncontrada = listCalif.find(
					(calif) =>
						calif.alumno.nombre === alumno.nombre &&
						calif.alumno.apellido === alumno.apellido
				);
				nuevasCalificaciones[alumno._id] = califEncontrada
					? califEncontrada.nota
					: "";
			});
			setCalificaciones(nuevasCalificaciones);
		}
	}, [listCalif, alumnos]);

	// Maneja el cambio de calificación de cada alumno
	const handleCalificacionChange = (alumnoId, calificacion) => {
		// Convertir a número y limitar entre 0 y 100
		const nota = Math.max(0, Math.min(100, Number(calificacion) || 0));
		setCalificaciones({
			...calificaciones,
			[alumnoId]: nota,
		});
	};

	// Enviar las calificaciones al backend cuando se hace clic en "Guardar Calificaciones"
	const guardarCalificaciones = async () => {
		// Envía las calificaciones al contexto o API
		const calificacionesData = Object.keys(calificaciones).map((alumnoId) => ({
			alumno: alumnoId,
			actividad: actividad._id,
			clase: idClase,
			nota: calificaciones[alumnoId],
		}));

		if (listCalif.length) {
			updateCalifActividad(calificacionesData);
			createCalifParcial(actividad.parcial);
			return;
		}
		createCalifActividad(calificacionesData);

		createCalifParcial(actividad.parcial);
	};

	if (!actividad) return null;

	return (
		<>
			<h2 className="text-xl font-bold">
				Calificaciones para la actividad: {actividad.nombre}
			</h2>
			<div className="max-w-sm ">
				<table className="min-w-2 mt-4">
					<thead>
						<tr>
							<th className="px-10 py-2 text-start font-bold ">Alumno</th>
							<th className="px-4 py-2">Calificación</th>
						</tr>
					</thead>
					<tbody>
						{alumnos.map((alumno) => (
							<tr key={alumno._id}>
								<td className="px-4 py-2">{`${alumno.nombre} ${alumno.apellido}`}</td>
								<td className="px-4 py-2 text-center">
									<input
										type="number"
										className="border rounded-lg px-2 py-1"
										value={calificaciones[alumno._id] || ""}
										min="0"
										max="100"
										onChange={(e) =>
											handleCalificacionChange(alumno._id, e.target.value)
										}
									/>
								</td>
							</tr>
						))}
					</tbody>
				</table>
				{/* Botón para guardar las calificaciones */}
				<div className=" flex justify-center">
					<button
						onClick={guardarCalificaciones}
						className="my-4 bg-green-500 text-white px-4 py-2 rounded-lg"
					>
						Guardar Calificaciones
					</button>
				</div>
			</div>
		</>
	);
}

ListActivCalifs.propTypes = {
	actividad: PropTypes.any,
};

export default ListActivCalifs;
