import { useEffect, useState } from "react";
import { useClases } from "../context/ClasesContext";
import { useAsistencia } from "../context/AsistenciaContext";
import { useAlumnos } from "../context/AlumnosContext";

function AsistenciaPage() {
	const { clase } = useClases();
	const { getDias, dias, errors: diasErrors } = useAsistencia();
	const { getAlumnos, alumnos, errors: alumnosErrors } = useAlumnos();

	const [asistencias, setAsistencias] = useState({});
	const [fechaSeleccionada, setFechaSeleccionada] = useState(null); // Fecha seleccionada para habilitar/deshabilitar los checkboxes

	useEffect(() => {
		getDias(clase);
		getAlumnos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Función para manejar el cambio en los checkboxes de alumnos
	const handleCheckboxChange = (alumnoId, fecha) => {
		setAsistencias((prev) => {
			const nuevosAsistencias = { ...prev };

			// Asegúrate de que el alumno tenga un objeto para sus fechas
			if (!nuevosAsistencias[alumnoId]) {
				nuevosAsistencias[alumnoId] = {};
			}

			// Cambiar el estado solo de la fecha seleccionada para ese alumno
			nuevosAsistencias[alumnoId][fecha] = !nuevosAsistencias[alumnoId][fecha];

			// Desmarcar las demás fechas de este alumno
			Object.keys(nuevosAsistencias[alumnoId]).forEach((key) => {
				if (key !== fecha) {
					nuevosAsistencias[alumnoId][key] = false;
				}
			});

			return nuevosAsistencias;
		});
	};

	// Función para manejar el cambio en el checkbox de encabezado
	const handleHeaderCheckboxChange = (dia) => {
		// Establecemos la fecha seleccionada
		setFechaSeleccionada(dia);
	};

	// Función para manejar el envío de las asistencias seleccionadas
	const handleEnviarAsistencias = () => {
		const asistenciasSeleccionadas = {};
		alumnos.forEach((alumno) => {
			if (asistencias[alumno.id]?.[fechaSeleccionada]) {
				asistenciasSeleccionadas[alumno.id] = {
					nombre: `${alumno.nombre} ${alumno.apellido}`,
					fecha: fechaSeleccionada,
					asistencia: asistencias[alumno.id][fechaSeleccionada],
				};
			}
		});
		console.log("Asistencias seleccionadas:", asistenciasSeleccionadas);
	};

	return (
		<div className="p-6">
			<h2 className="text-3xl font-semibold text-blue-600 mb-6 text-center">
				Asistencia - {clase?.nombre || "Clase"}
			</h2>

			{diasErrors && <div className="text-red-500">{diasErrors}</div>}
			{alumnosErrors && <div className="text-red-500">{alumnosErrors}</div>}

			{dias.length > 0 && alumnos.length > 0 ? (
				<div className="overflow-x-auto">
					<table className="table-auto w-full border-collapse border border-gray-300">
						<thead>
							<tr>
								<th className="border border-gray-300 px-4 py-2 sticky left-0 bg-white">
									Alumno
								</th>
								{dias.map((dia, index) => (
									<th
										key={index}
										className="border border-gray-300 px-4 py-2 text-sm"
									>
										<div>
											{new Date(dia).toLocaleString("es-ES", {
												weekday: "long",
											})}
										</div>
										<div>{new Date(dia).toLocaleDateString()}</div>
										<input
											type="checkbox"
											checked={fechaSeleccionada === dia}
											onChange={() => handleHeaderCheckboxChange(dia)}
											className="mt-2"
										/>
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{alumnos.map((alumno) => (
								<tr key={alumno.id}>
									{/* Fijar el nombre del alumno y hacerlo más ancho */}
									<td
										className="border border-gray-300 px-4 py-2 sticky left-0 bg-white w-[300px] flex flex-col" // Ajusta el ancho aquí
									>
										<div className="truncate">
											{alumno.nombre} {alumno.apellido}
										</div>
									</td>
									{dias.map((dia) => (
										<td
											key={`${alumno.id}-${dia}`}
											className="border border-gray-300 px-4 py-2 text-center"
										>
											<input
												id={alumno.id}
												type="checkbox"
												checked={asistencias[alumno.id]?.[dia] || false}
												onChange={() => handleCheckboxChange(alumno.id, dia)}
												disabled={fechaSeleccionada !== dia} // Deshabilitar todos los checkboxes que no correspondan a la fecha seleccionada
											/>
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<p className="text-gray-600">
					{dias.length === 0
						? "No hay fechas disponibles."
						: "No hay alumnos registrados."}
				</p>
			)}

			{/* Botón para enviar las asistencias */}
			<button
				onClick={handleEnviarAsistencias}
				className="mt-4 px-6 py-2 bg-blue-600 text-white rounded"
			>
				Enviar Asistencias
			</button>
		</div>
	);
}

export default AsistenciaPage;
