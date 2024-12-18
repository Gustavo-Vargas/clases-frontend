import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useClases } from "../context/ClasesContext";

function ClaseItem({ clase }) {
	const { selectClase } = useClases();

	const handleSelectClase = (clase) => {
		selectClase(clase);
	};
	return (
		<Link
			onClick={() => handleSelectClase(clase._id)}
			to="/clase"
			className="block p-4 border-b border-border dark:border-darkBorder 
             bg-background dark:bg-darkSurface hover:bg-secondary dark:hover:bg-secondary 
             transition duration-300 rounded-md group shadow-sm"
		>
			<h3 className="text-lg font-semibold text-textPrimary dark:text-darkTextPrimary group-hover:text-surface">
				{clase.nombre}
			</h3>
			<p className="text-sm text-textSecondary dark:text-darkTextSecondary group-hover:text-surface">
				<strong>Hora: </strong> {clase.hora_inicio} - {clase.hora_fin}
			</p>
		</Link>
	);
}

export default ClaseItem;

ClaseItem.propTypes = {
	clase: PropTypes.any,
};
