import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'
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
	comics: z.string().endsWith('Comics', { message: 'Campo requerido' }),
})

const LoginDomainFunction = makeDomainFunction(signInValidator)(
	async (values) => {
		return values
	}
)
export const action = async ({ request }: ActionArgs) => {
	const result = await LoginDomainFunction(await inputFromForm(request))
	if (result.success) return createUserSession(v4(), result.data.comics)
	const inputErrors = errorMessagesForSchema(result.inputErrors, signInValidator)
	return json(
		{
			username: inputErrors.username,
			password: inputErrors.password,
			comics: inputErrors.comics,
		},
		{ status: result.success ? 200 : 400 }
	)
}
export const meta: MetaFunction = () => ({ title: 'Herox - Iniciar sesión' })
export const loader = async ({ request }: LoaderArgs) => {
	const session = await getSession(request)

	if (session.get('userId')) return redirect('/private')
	return null
}
export const FormField = ({ label, name, type, errors, ...rest }: Field) => {
	return (
		<aside className="w-full max-w-xs space-y-0 form-control">
			<label className="font-bold label label-text">{label}</label>
			<input
				type={type}
				name={name}
				className="w-full max-w-xs input input-bordered "
				{...rest}
			/>
			<span className="text-red-500 h-9 " data-test="input-errors">
				{errors && errors}
			</span>
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
		<section className="min-h-screen hero bg-base-200">
			<article className="flex-col hero-content lg:flex-row-reverse">
				<div className="text-center lg:text-left">
					<h1 className="text-4xl font-bold text-center">
						Busca tus heroes favoritos de Marvel y DC!
					</h1>
					<p className="py-6 text-center">
						En herox, puedes encontrar a tus heroes favoritos del mundo de los comics.
					</p>
				</div>

				<div className="flex-shrink-0 w-full max-w-sm shadow-2xl card bg-base-100">
					<Form method="post" className="grid card-body place-items-center">
						<FormField
							label="Nombre de usuario"
							name="username"
							type="text"
							errors={actionData && actionData.username && actionData?.username[0]}
							data-test="username-input"
						/>
						<FormField
							label="Contraseña"
							name="password"
							type="password"
							errors={actionData && actionData.password && actionData?.password[0]}
							data-test="password-input"
						/>
						<aside className="w-full max-w-xs form-control">
							<label htmlFor="comics" className="font-bold label label-text">
								Comic Favorito
							</label>
							<select className="w-full select select-primary" name="comics">
								<option defaultValue="Seleccione su comic favorito">
									Seleccione su comic favorito
								</option>
								<option>Marvel Comics</option>
								<option>DC Comics</option>
							</select>
							<span className="h-6 text-red-500 " data-test="input-errors">
								{actionData && actionData.comics && actionData.comics}
							</span>
						</aside>
						<button
							type="submit"
							className="btn btn-primary "
							disabled={isSubmitting}
							name="submit-login"
						>
							{!isSubmitting ? 'Iniciar sesión' : 'Iniciando...'}
						</button>
					</Form>
				</div>
			</article>
		</section>
	)
}
