import { useState } from "react";
import { useEffect } from "react";
import { useCalifParcial } from "../context/CalifParcialContext";
import { useClases } from "../context/ClasesContext";
import { useParciales } from "../context/ParcialesContext";
import { useAlumnos } from "../context/AlumnosContext";

function CalificacionPage() {
	const { getCalifParcial, listCalif } = useCalifParcial();
	const { idClase } = useClases();
	const { getParciales, parciales } = useParciales();
	const { getAlumnos, alumnos } = useAlumnos();

	const [activeTab, setActiveTab] = useState("final");

	// Traer los alumnos cuando el componente se monta
	useEffect(() => {
		getParciales(idClase);
		getCalifParcial();
		getAlumnos();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	// Si no hay alumnos, no mostrar los tabs
	if (alumnos.length === 0) {
		return (
			<div className="container mx-auto mt-8 p-4">
				<h2 className="text-2xl font-bold mb-4">
					Calificaciones - No hay alumnos registrados
				</h2>
			</div>
		);
	}

	return (
		<div className="container mx-auto mt-8 p-4">
			<h2 className="text-2xl font-bold mb-4">Calificaciones</h2>

			{/* Tabs */}
			<div className="flex border-b mb-4">
				<button
					className={`px-4 py-2 text-sm font-medium ${
						activeTab === "final"
							? "border-b-2 border-blue-500 text-blue-500"
							: "text-gray-500"
					}`}
					onClick={() => setActiveTab("final")}
				>
					Calificación Final
				</button>
				<button
					className={`px-4 py-2 text-sm font-medium ${
						activeTab === "parcial"
							? "border-b-2 border-blue-500 text-blue-500"
							: "text-gray-500"
					}`}
					onClick={() => setActiveTab("parcial")}
				>
					Calificación por Parcial
				</button>
			</div>

			{/* Contenido de cada pestaña */}
			<div>
				{activeTab === "final" && (
					<div className="bg-white shadow rounded-lg p-4">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-200">
									<th className="py-2 px-8 flex items-start">Alumno</th>
									<th className="py-2 px-4">Calificación Final</th>
								</tr>
							</thead>
							<tbody>
								{listCalif.map((item) => (
									<tr key={item.matricula}>
										<td className="px-4 py-2">
											{item.nombre} {item.apellido}
										</td>
										<td className="px-4 py-2 text-center">
											{item.calificacionFinal}
										</td>
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}

				{activeTab === "parcial" && (
					<div className="bg-white shadow rounded-lg p-4">
						<table className="w-full table-auto">
							<thead>
								<tr className="bg-gray-200">
									<th className="py-2 px-8 flex items-start">Alumno</th>
									{parciales.map((parcial) => (
										<th
											key={parcial._id}
											className="py-2 px-4 whitespace-nowrap"
										>
											{parcial.nombre}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{listCalif.map((item) => (
									<tr key={item.matricula} className="hover:bg-gray-100">
										<td className="px-4 py-2">
											{item.nombre} {item.apellido}
										</td>
										{parciales.map((_, index) => (
											<td key={index} className="px-4 py-2 text-center">
												{item.parciales[index]?.calificacion ?? "-"}
											</td>
										))}
									</tr>
								))}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	);
}

export default CalificacionPage;
