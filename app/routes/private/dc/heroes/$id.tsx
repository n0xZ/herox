import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { HeroItemResult } from '~/components/hero/HeroResult'

import { getDCHeroes } from '~/services/heroes.server'

export const meta: MetaFunction = () => ({
	title: `Herox/DC - Resultado de busqueda`,
})
export const loader = async ({ params }: LoaderArgs) => {
	const heroes = await getDCHeroes()
	const heroById = heroes.find((hero) => hero.id === Number(params?.id))

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
