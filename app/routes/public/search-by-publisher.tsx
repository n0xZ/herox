import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'

import { HeroListResult } from '~/components/hero/HeroResult'
import { FormField } from '~/routes/login'
import { getDCHeroes, getHeroes } from '~/services/heroes.server'
import type { Hero } from '~/types'
export const meta: MetaFunction = () => ({ title: 'Herox/DC - Buscar héroe' })
export const loader = async ({ request }: LoaderArgs) => {
	const url = new URL(request.url)
	const params = url.searchParams
		.get('publisher' ?? '')
		?.replace(' ', '-')
		.toLowerCase()

	const heroes = await getHeroes()
	const filteredHeroesByName = heroes.filter(
		(hero) => hero.biography.publisher?.replace(' ', '-').toLowerCase() === params
	)

	return json({ heroes: filteredHeroesByName })
}

export default function SearchHeroes() {
	const fetcher = useFetcher<{ heroes: Hero[] }>()

	const isSubmitting = fetcher.state === 'submitting'
	return (
		<section className='grid place-items-center'>
			<fetcher.Form
				method="get"
				className="flex flex-col items-center justify-center p-3 space-x-5 space-y-3 xl:space-y-0 "
			>
				<FormField
					label="Publisher de los heroes"
					name="publisher"
					type="text"
					disabled={isSubmitting}
				/>
				<button
					type="submit"
					className="w-32 btn btn-primary"
					disabled={isSubmitting}
				>
					{isSubmitting ? 'Buscando...' : 'Buscar heroe'}
				</button>
				{fetcher.data ? (
					fetcher.data?.heroes.length !== 0 ? (
						<HeroListResult heroes={fetcher.data?.heroes} />
					) : (
						<div>No se han encontrado resultados 😥</div>
					)
				) : null}
			</fetcher.Form>
		</section>
	)
}
