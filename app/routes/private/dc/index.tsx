import type { MetaFunction } from '@remix-run/node'
import { Link } from '@remix-run/react'
import { useSelectedHeroes } from '~/hooks/useSelectedHeroes'
import SelectedHeroes from '~/components/hero/SelectedHeroes'
export const meta: MetaFunction = () => ({ title: 'Herox/DC - Home' })
const EmptySelectedHeroes = () => {
	return (
		<section className="flex flex-col items-center h-screen space-y-2">
			<h1 className="text-3xl font-bold">Bienvenido a DC Side!</h1>
			<p>Al parecer no tienes heroes escogidos</p>
			<Link to="/private/dc/heroes" className="text-red-500">
				{' '}
				Puedes elegirlos clickeando aquí
			</Link>
		</section>
	)
}
export default function MarvelHome() {
	const { myHeroes } = useSelectedHeroes()
	if (!myHeroes || myHeroes?.length === 0) return <EmptySelectedHeroes />
	return (
		<>
			<h2 className="text-2xl text-center">Mi equipo actual</h2>
			<SelectedHeroes heroes={myHeroes!} publisher="dc" />
		</>
	)
}
