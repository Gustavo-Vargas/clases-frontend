import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import ClaseItem from "../components/ClaseItem";
import { useClases } from "../context/ClasesContext";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { useEffect } from "react";

function Layout({ children }) {
	const { isAuthenticated, user } = useAuth();
	const { clases, getClases } = useClases();

	useEffect(() => {
		getClases();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className="flex flex-col min-h-screen bg-background dark:bg-darkBorder transition-colors">
			<Header />
			<div className="flex flex-row">
				{isAuthenticated && user.rol !== true ? (
					<div
						className="hidden md:block w-64 bg-primary shadow-md 
								dark:bg-darkBorder border-r border-border 
								dark:border-darkBorder dark:shadow-darkBackground transition-colors"
					>
						<div className="m-2">
							<Link
								to="/clases"
								className="text-lg font-bold p-4 text-textPrimary dark:text-darkTextPrimary
											hover:text-white"
							>
								Clases
							</Link>
						</div>
						<div className="overflow-y-auto h-full p-2 space-y-2">
							{clases.map((clase) => (
								<ClaseItem clase={clase} key={clase._id} />
							))}
						</div>
					</div>
				) : null}

				<div className="container mx-auto flex-1 py-10 pt-0">{children}</div>
			</div>
		</div>
	);
}

export default Layout;

Layout.propTypes = {
	children: PropTypes.any,
};
