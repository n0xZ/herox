import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, useActionData, useTransition } from '@remix-run/react'
import type { InputHTMLAttributes } from 'react'
import { useEffect, useRef } from 'react'
import {
	makeDomainFunction,
	errorMessagesForSchema,
	inputFromForm,
} from 'remix-domains'
import { v4 } from 'uuid'
import { z } from 'zod'
import { createUserSession, getSession } from '~/utils/session.server'

interface Field extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	type: string
	name: string
	errors?: string
}
export const signInValidator = z.object({
	username: z.string().min(5, { message: 'Campo requerido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
})

const LoginDomainFunction = makeDomainFunction(signInValidator)(
	async (values) => {
		return values
	}
)
export const action = async ({ request }: ActionArgs) => {
	const result = await LoginDomainFunction(await inputFromForm(request))
	if (result.success) return createUserSession(v4())
	const inputErrors = errorMessagesForSchema(result.inputErrors, signInValidator)
	return json({
		errors: result.errors,
		username: inputErrors.username,
		password: inputErrors.password,
	})
}
export const loader = async ({ request }: LoaderArgs) => {
	const session = await getSession(request)

	if (session.get('userId')) return redirect('/private')
	return null
}
export const FormField = ({ label, name, type, errors, ...rest }: Field) => {
	return (
		<aside className="w-full max-w-xs form-control">
			<label className="label label-text">{label}</label>
			<input
				type={type}
				name={name}
				className="w-full max-w-xs input input-bordered input-primary"
				{...rest}
			/>
			<span className="h-12 text-red-500 ">{errors && errors}</span>
		</aside>
	)
}

export default function LoginPage() {
	const formRef = useRef<HTMLFormElement | null>(null)
	const actionData = useActionData<typeof action>()
	const transition = useTransition()
	const isSubmitting = transition.state === 'submitting'

	useEffect(() => {
		formRef.current?.reset()
	}, [isSubmitting])
	return (
		<section>
			<Form method="post">
				<FormField
					label="Nombre de usuario"
					name="username"
					type="text"
					errors={actionData?.username[0]}
				/>
				<FormField
					label="Contraseña"
					name="password"
					type="text"
					errors={actionData?.password[0]}
				/>
				<button type="submit" className="btn btn-primary" disabled={isSubmitting}>
					{!isSubmitting ? 'Iniciar sesión' : 'Iniciando...'}
				</button>
			</Form>
		</section>
	)
}
