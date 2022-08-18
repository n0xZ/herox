import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { HeroItemResult } from '~/components/hero/HeroResult'

import { getMarvelHeroes } from '~/services/heroes.server'

export const meta: MetaFunction = () => ({
	title: `Herox/Marvel - Resultado de busqueda`,
})
export const loader = async ({ params }: LoaderArgs) => {
	const heroes = await getMarvelHeroes()
	const heroById = heroes.find((hero) => hero.id === Number(params?.id))
	console.log(heroById)
	return heroById
}

export default function PublisherContent() {
	const loaderData = useLoaderData()

	return (
		<section className="grid h-screen place-items-center">
			<h2 className="text-4xl text-center">Detalles del personaje</h2>

			<HeroItemResult hero={loaderData} />
		</section>
	)
}
