import type { MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { usePagination } from '~/hooks/usePagination'
import { getDCHeroes } from '~/services/heroes.server'
import { HeroList } from '~/components/hero/HeroList'

export const meta: MetaFunction = () => ({
	title: 'Herox - Lista de superheroes',
})

export const loader = async () => {
	const DCHeroes = await getDCHeroes()
	return json(DCHeroes)
}

export default function HeroListPage() {
	const loaderData = useLoaderData<typeof loader>()
	const { heroContainer, heroesPaginated } = usePagination(loaderData)
	return (
		<>
			<h2 className="mt-8 mb-4 text-4xl font-bold text-center">
				Bienvenido a DC Comics.
			</h2>

			{loaderData && (
				<HeroList
					heroes={heroesPaginated}
					heroContainer={heroContainer}
					publisher="dc"
				/>
			)}
		</>
	)
}
