import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useClases } from "../context/ClasesContext";

function ClaseCard({ clase }) {
	const { selectClase } = useClases();

	const handleSelectClase = (clase) => {
		selectClase(clase);
	};
	return (
		<Link
			to="/clase"
			onClick={() => handleSelectClase(clase._id)}
			className="group"
		>
			<div className="bg-surface dark:bg-darkSurface p-6 rounded-lg shadow-md border border-border dark:border-darkBorder transition hover:shadow-lg">
				<header className="flex justify-between items-center">
					<h2 className="text-textPrimary dark:text-darkTextPrimary text-xl font-semibold">
						{clase.nombre}
					</h2>
					<div className="text-textSecondary dark:text-darkTextSecondary text-sm">
						{clase.hora_inicio} - {clase.hora_fin}
					</div>
				</header>

				<p className="text-textSecondary dark:text-darkTextSecondary mt-3 text-sm">
					{clase.descripcion}
				</p>

				{/* Notificaciones */}
				<div className="mt-3">
					<p className="text-textSecondary dark:text-darkTextSecondary text-sm">
						<span className="font-medium">Notificación 1:</span> {clase.price}
					</p>
					<p className="text-textSecondary dark:text-darkTextSecondary text-sm">
						<span className="font-medium">Notificación 2:</span> {clase.price}
					</p>
				</div>
			</div>
		</Link>
	);
}

export default ClaseCard;

ClaseCard.propTypes = {
	clase: PropTypes.object.isRequired,
};
