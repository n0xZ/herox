import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { usePagination } from '~/hooks/usePagination'
import { getMarvelHeroes } from '~/services/heroes.server'
import { HeroList } from '~/components/hero/HeroList'

export const meta: MetaFunction = () => ({
	title: 'Herox/Marvel - Lista de superheroes',
})

export const loader = async () => {
	const marvelHeroes = await getMarvelHeroes()

	return json(marvelHeroes)
}

export default function HeroListPage() {
	const loaderData = useLoaderData<typeof loader>()
	const { heroContainer, heroesPaginated } = usePagination(loaderData)
	return (
		<>
			<h2 className="mt-6 text-4xl font-bold text-center font-inter ">
				Lista de personajes:
			</h2>

			{loaderData && (
				<HeroList
					heroes={heroesPaginated}
					heroContainer={heroContainer}
					publisher="marvel"
				/>
			)}
		</>
	)
}
