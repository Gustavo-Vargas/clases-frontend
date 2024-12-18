import { useEffect, useState } from "react";
import { useClases } from "../context/ClasesContext";

function Calendario() {
	const { calendario, getCalendario } = useClases();
	const [tableData, setTableData] = useState([]);

	useEffect(() => {
		getCalendario(); // Cargar el calendario al montar el componente
	}, []);

	const getMateriaColor = (materia) => {
		// Define tu paleta de colores
		const colores = {
			Matemáticas: "#ffcc00", // Amarillo
			Física: "#00b3b3", // Verde azulado
			Química: "#ff6699", // Rosa
			Humanidades: "#ff6347", // Tomate (para Humanidades)
		};
		return colores[materia] || "#50C878"; // Color predeterminado
	};

	useEffect(() => {
		// Verificar si 'calendario' es un objeto válido y tiene los días correctos
		if (calendario && typeof calendario === "object") {
			const newTableData = [];
			const dias = [
				"Lunes",
				"Martes",
				"Miércoles",
				"Jueves",
				"Viernes",
				"Sábado",
				"Domingo",
			];

			// Generar solo horas en punto (7:00, 8:00, ..., 19:00)
			const horas = [];
			for (let i = 7; i <= 19; i++) {
				horas.push(`${i}:00`);
			}

			// Procesar clases
			horas.forEach((hora) => {
				const row = { hora };
				dias.forEach((dia) => {
					// Verificar que 'calendario[dia]' esté definido y sea un arreglo
					const clasesEnHora = Array.isArray(calendario[dia])
						? calendario[dia]
								.filter(
									(clase) =>
										clase.hora_inicio === hora ||
										(clase.hora_inicio < hora && clase.hora_fin > hora)
								)
								.map((clase) => ({
									nombre: clase.nombre,
									hora_fin: clase.hora_fin,
									color: getMateriaColor(clase.nombre),
								}))
						: [];
					row[dia] = clasesEnHora.length ? clasesEnHora : [];
				});
				newTableData.push(row);
			});

			setTableData(newTableData);
		} else {
			console.error(
				"El calendario no está en el formato esperado o está vacío."
			);
		}
	}, [calendario]);

	// Verificar si el calendario está vacío o cargando
	if (!calendario) {
		return <div>Cargando calendario...</div>;
	}

	return (
		<div>
			<h2>Calendario de Clases</h2>
			<table
				border="1"
				style={{
					width: "100%",
					textAlign: "center",
					borderCollapse: "collapse",
					fontFamily: "Arial, sans-serif",
					borderRadius: "10px",
					boxShadow: "0px 0px 15px rgba(0, 0, 0, 0.1)",
				}}
			>
				<thead>
					<tr style={{ backgroundColor: "#0077b6", color: "white" }}>
						<th>Horario</th>
						{[
							"Lunes",
							"Martes",
							"Miércoles",
							"Jueves",
							"Viernes",
							"Sábado",
							"Domingo",
						].map((dia) => (
							<th key={dia} style={{ padding: "10px", fontWeight: "bold" }}>
								{dia}
							</th>
						))}
					</tr>
				</thead>
				<tbody>
					{tableData.map((row, rowIndex) => (
						<tr key={rowIndex}>
							<td
								style={{
									backgroundColor: "#f2f2f2",
									borderRight: "2px solid #ddd",
									padding: "8px",
									fontWeight: "bold",
								}}
							>
								{row.hora}
							</td>
							{[
								"Lunes",
								"Martes",
								"Miércoles",
								"Jueves",
								"Viernes",
								"Sábado",
								"Domingo",
							].map((dia, diaIndex) => {
								const clases = row[dia];
								if (clases.length === 0)
									return (
										<td
											key={diaIndex}
											style={{
												padding: "10px",
												borderBottom: "1px solid #ddd",
											}}
										></td>
									);

								return clases.map((clase, claseIndex) => (
									<td
										key={`${diaIndex}-${claseIndex}`}
										rowSpan={clase.hora_fin === row.hora ? 1 : 2} // Asegurarse de ocupar el espacio correcto
										style={{
											backgroundColor: clase.color,
											color: "black",
											padding: "10px",
											borderBottom: "1px solid #ddd",
											fontWeight: "bold",
											textAlign: "center",
										}}
									>
										{clase.nombre}
									</td>
								));
							})}
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}

export default Calendario;
