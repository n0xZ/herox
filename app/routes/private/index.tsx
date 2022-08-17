import type { MetaFunction } from '@remix-run/node'

export const meta: MetaFunction = () => ({ title: 'Herox - Dashboard' })

export default function PrivateHome() {
	return (
		<section className="h-full">
			<h2>Bienvenido!</h2>
			<article></article>
			<article></article>
		</section>
	)
}
