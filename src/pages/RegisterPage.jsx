import { useForm } from "react-hook-form";
import { useAuth } from "../context/AuthContext";
import registerIcon from "../assets/register.svg";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useMembresias } from "../context/MembresiaContext";

function RegisterPage() {
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm();
	const { signup, isAuthenticated, errors: registerErrors } = useAuth();
	const { createMembresia } = useMembresias();
	const navigate = useNavigate();

	useEffect(() => {
		if (isAuthenticated) navigate("/clases");
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [isAuthenticated]);

	const onSubmit = handleSubmit(async (values) => {
		const newUser = await signup(values);

		// Verificamos si el usuario fue creado exitosamente y tiene un _id
		if (newUser && newUser.id) {
			console.log("Creando membresía para el usuario...");

			await createMembresia(newUser.id);
			console.log("Membresía creada exitosamente");
		}
	});

	return (
		<div className="bg-background text-textPrimary min-h-screen flex justify-center items-center transition-colors dark:bg-darkBackground">
			<div className="max-w-4xl w-full bg-surface rounded-lg shadow-md overflow-hidden flex dark:bg-gray-900 dark:shadow-lg">
				{/* Formulario */}
				<div className="w-full md:w-1/2 p-8">
					<h2 className="text-2xl font-bold mb-4 text-center dark:text-gray-100">
						Crear Cuenta
					</h2>
					{registerErrors.map((error, i) => (
						<div className="bg-red-500 p-2 my-2 text-white" key={i}>
							{error}
						</div>
					))}
					<form onSubmit={onSubmit} className="space-y-4">
						<input
							type="text"
							className="w-full bg-input text-textPrimary px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500"
							placeholder="Nombre de Usuario"
							{...register("username", { required: true, minLength: 5 })}
						/>
						{errors.username?.type === "required" && (
							<p className="text-red-500">Nombre de usuario requerido</p>
						)}
						{errors.username?.type === "minLength" && (
							<p className="text-red-500">
								La longitud minima es de 5 caracteres
							</p>
						)}

						<input
							type="email"
							className="w-full bg-input text-textPrimary px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500"
							placeholder="Correo Electrónico"
							{...register("email", {
								required: true,
								pattern: {
									value:
										/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
									message: "Introduce un email válido",
								},
							})}
						/>
						{errors.email?.type === "required" && (
							<p className="text-red-500">Email es requerido</p>
						)}
						{errors.email?.message && (
							<p className="text-red-500">Email no válido</p>
						)}

						<input
							type="password"
							className="w-full bg-input text-textPrimary px-4 py-2 rounded-md border border-border focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-800 dark:text-gray-200 dark:border-gray-700 dark:focus:ring-blue-500"
							placeholder="Contraseña"
							{...register("password", { required: true, minLength: 6 })}
						/>
						{errors.password?.type === "required" && (
							<p className="text-red-500">Password es requerido</p>
						)}
						{errors.password?.type === "minLength" && (
							<p className="text-red-500">
								La longitud minima es de 6 caracteres
							</p>
						)}

						<button
							className="w-full bg-primary text-white py-2 rounded-md
											hover:bg-hover dark:bg-blue-600 dark:hover:bg-blue-700"
						>
							Registrar
						</button>
					</form>
					<p className="flex gap-x-2 justify-between pt-5 mt-5 dark:text-gray-100">
						¿Ya tienes una cuenta?
						<Link to="/login" className="text-sky-500">
							!Inicia sesión!
						</Link>
					</p>
				</div>

				{/* Imagen */}
				<div className="hidden md:block md:w-1/2 p-1 bg-cover bg-center dark:bg-gray-800">
					<img src={registerIcon} />
				</div>
			</div>
		</div>
	);
}

export default RegisterPage;
