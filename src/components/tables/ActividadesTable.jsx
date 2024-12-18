import PropTypes from "prop-types";

function ActividadesTable({
	actividades,
	handleEditActividad,
	deleteActividad,
	viewActividad,
}) {
	return (
		<table className="w-full table-auto border-collapse border border-border mt-4 shadow-md dark:border-darkBorder">
			<thead>
				<tr className="bg-primary dark:bg-darkPrimary text-white">
					<th className="border border-gray-300 px-4 py-2">#</th>
					<th className="border border-gray-300 px-4 py-2">Nombre</th>
					<th className="border border-gray-300 px-4 py-2">Descripcion</th>
					<th className="border border-gray-300 px-4 py-2">Fecha</th>
					<th className="border border-gray-300 px-4 py-2">Parcial</th>
					<th className="border border-gray-300 px-4 py-2">Criterio</th>
					<th className="border border-gray-300 px-4 py-2">Acciones</th>
				</tr>
			</thead>
			<tbody>
				{actividades.map((actividad, index) => (
					<tr
						key={actividad.id}
						className="text-center hover:bg-gray-100 dark:hover:bg-gray-700"
						onClick={() => viewActividad(actividad)} // Redirigir al hacer clic
					>
						<td className="border border-gray-300 px-4 py-2">{index + 1}</td>
						<td className="border border-gray-300 px-4 py-2">
							{actividad.nombre}
						</td>
						<td className="border border-gray-300 px-4 py-2">
							{actividad.descripcion}
						</td>
						<td className="border border-gray-300 px-4 py-2">
							{actividad.fecha_entrega}
						</td>
						<td className="border border-gray-300 px-4 py-2">
							{/* {actividad.criterio.nombre} */}
						</td>
						<td className="border border-gray-300 px-4 py-2">
							{actividad.parcial.nombre}
						</td>
						<td className="border border-gray-300 px-4 py-2">
							<button
								className="bg-blue-500 hover:bg-blue-600 text-white px-2 py-1 rounded mr-2"
								onClick={(e) => {
									e.stopPropagation(); // Prevenir la redirección al hacer clic en editar
									handleEditActividad(actividad);
								}}
							>
								Editar
							</button>
							<button
								className="bg-red-500 hover:bg-red-600 text-white px-2 py-1 rounded"
								onClick={(e) => {
									e.stopPropagation(); // Prevenir la redirección al hacer clic en eliminar
									deleteActividad(actividad._id);
								}}
							>
								Eliminar
							</button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}

ActividadesTable.propTypes = {
	actividades: PropTypes.any,
	viewActividad: PropTypes.any,
	handleEditActividad: PropTypes.any,
	deleteActividad: PropTypes.any,
};

export default ActividadesTable;
