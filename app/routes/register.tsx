import type { ActionArgs, LoaderArgs, MetaFunction } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Form, Link, useActionData, useTransition } from '@remix-run/react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import type { InputHTMLAttributes } from 'react'
import {
	makeDomainFunction,
	errorMessagesForSchema,
	inputFromForm,
} from 'remix-domains'
import { v4 } from 'uuid'
import { z } from 'zod'
import { auth } from '~/lib/firebase.server'
import { handleFirebaseErrors } from '~/utils/firebase-errors.server'
import { createUserSession, getSession } from '~/utils/session.server'

interface Field extends InputHTMLAttributes<HTMLInputElement> {
	label: string
	type: string
	name: string
	errors?: string
}
export const signUpValidator = z.object({
	email: z
		.string()
		.min(5, { message: 'Campo requerido' })
		.email({ message: 'Formato de email ingresado no válido' }),
	password: z.string().min(5, { message: 'Campo requerido' }),
	comics: z.string().endsWith('Comics', { message: 'Campo requerido' }),
})

const registerDomainFunction = makeDomainFunction(signUpValidator)(
	async ({ password, email, comics }) => {
		const { user } = await createUserWithEmailAndPassword(auth, email, password)

		return { user, comics }
	}
)
export const action = async ({ request }: ActionArgs) => {
	const result = await registerDomainFunction(await inputFromForm(request))

	if (result.success) return createUserSession(v4(), result.data.comics)

	const inputErrors = errorMessagesForSchema(result.inputErrors, signUpValidator)
	const externalErrors = result.errors.length !== 0 ? result.errors[0].message : undefined
	return json(
		{
			email: inputErrors.email,
			password: inputErrors.password,
			comics: inputErrors.comics,
			externalErrors: handleFirebaseErrors(externalErrors),
		},
		{ status: result.success ? 200 : 400 }
	)
}
export const meta: MetaFunction = () => ({
	title: 'Herox - Crea tu nueva cuenta!',
})
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

export default function RegisterPage() {
	const actionData = useActionData<typeof action>()
	const transition = useTransition()
	const isSubmitting = transition.state === 'submitting'

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
					<Form
						ref={(e) => isSubmitting && e?.reset()}
						method="post"
						className="grid card-body place-items-center"
					>
						<FormField
							label="Correo electrónico"
							name="email"
							type="email"
							errors={actionData && actionData.email && actionData?.email[0]}
							data-test="email-input"
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
							{!isSubmitting ? 'Crear cuenta' : 'Creando nueva cuenta...'}
						</button>
						<Link to="/register">Ya tengo una cuenta</Link>
						<span className="text-red-500 h-9 ">
							{actionData && actionData.externalErrors && actionData.externalErrors}
						</span>
					</Form>
				</div>
			</article>
		</section>
	)
}
