import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import { AuthProvider } from "./context/AuthContext";
import { ClasesProvider } from "./context/ClasesContext";
import { AlumnosProvider } from "./context/AlumnosContext";
import { CriteriosProvider } from "./context/CriteriosContext";
import { ParcialesProvider } from "./context/ParcialesContext";
import { AsistenciaProvider } from "./context/AsistenciaContext";
import { ActividadesProvider } from "./context/ActividadContext";
import { CalifActivProvider } from "./context/CalifActivContext";
import { CalifParcialProvider } from "./context/CalifParcialContext";
import { MembresiasProvider } from "./context/MembresiaContext";

function App() {
	return (
		<AuthProvider>
			<ClasesProvider>
				<AlumnosProvider>
					<CriteriosProvider>
						<ParcialesProvider>
							<AsistenciaProvider>
								<ActividadesProvider>
									<CalifActivProvider>
										<CalifParcialProvider>
											<MembresiasProvider>
												<BrowserRouter
													future={{
														v7_startTransition: true,
														v7_relativeSplatPath: true,
													}}
												>
													<AppRoutes />
												</BrowserRouter>
											</MembresiasProvider>
										</CalifParcialProvider>
									</CalifActivProvider>
								</ActividadesProvider>
							</AsistenciaProvider>
						</ParcialesProvider>
					</CriteriosProvider>
				</AlumnosProvider>
			</ClasesProvider>
		</AuthProvider>
	);
}

export default App;
