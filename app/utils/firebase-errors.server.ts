export const handleFirebaseErrors = (error?: string) => {
	if (!error) return
	if (error?.includes('auth/user-not-found')) return 'Usuario no encontrado'
	if (error?.includes('auth/email-already-in-use')) return 'Email ya en uso'
	if (error?.includes('auth/wrong-password')) return 'Contraseña incorrecta'
}
