import type { ActionArgs } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData } from '@remix-run/react'
import { createUserSession } from '~/utils/session.server'

type Credentials = {
	username: string
	password: string
}

type Field = {
	label: string
	type: string
	name: string
	errors?: string
}

export const action = async ({ request }: ActionArgs) => {
	const formData = Object.fromEntries(await request.formData()) as Credentials
	const errors = { username: '', password: '' }
	if (formData.username === '') errors.username = 'Campo requerido'
	if (formData.password === '') errors.password = 'Campo requerido'
	if (Object.keys(errors)) return errors
	createUserSession(JSON.stringify(formData))
}

export const FormField = ({ label, name, type, errors }: Field) => {
	return (
		<aside className="w-full max-w-xs form-control">
			<label className="label label-text">{label}</label>
			<input
				type={type}
				name={name}
				className="w-full max-w-xs input input-bordered input-primary"
			/>
			<span className="h-12 text-red-500 ">{errors && errors}</span>
		</aside>
	)
}

export default function LoginPage() {
	const actionData = useActionData<typeof action>()
	return (
		<section>
			<Form method="post">
				<FormField
					label="Nombre de usuario"
					name="username"
					type="text"
					errors={actionData?.username}
				/>
				<FormField
					label="Contraseña"
					name="password"
					type="text"
					errors={actionData?.password}
				/>
				<button type="submit" className="btn btn-primary">
					Iniciar sesión
				</button>
			</Form>
		</section>
	)
}
