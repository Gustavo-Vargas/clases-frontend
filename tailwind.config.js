/** @type {import('tailwindcss').Config} */
export default {
	content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: 'class', // Activa el modo oscuro usando una clase específica
	theme: {
		extend: {
			colors: {
				primary: "#4A90E2",         /* Azul Profesional */
				secondary: "#50C878",       /* Verde Menta */
				background: "#F9FAFB",      /* Gris Claro (para evitar fatiga visual) */
				surface: "#FFFFFF",         /* Blanco */
				textPrimary: "#1F2937",     /* Gris Oscuro */
				textSecondary: "#6B7280",   /* Gris Medio */
				border: "#D1D5DB",          /* Gris Suave */
				success: "#10B981",         /* Verde Suave */
				error: "#EF4444",           /* Rojo Brillante */
				warning: "#F59E0B",         /* Naranja Cálido */
				info: "#3B82F6",            /* Azul Intenso */
				hover: "#2563EB",           /* Azul Más Oscuro */

				// Paleta para tema oscuro
				darkBackground: '#1A202C',
				darkSurface: '#2D3748',
				darkTextPrimary: '#E2E8F0',
				darkTextSecondary: '#A0AEC0',
				darkBorder: '#4A5568',
			},
		},
	},
	plugins: [],
};
