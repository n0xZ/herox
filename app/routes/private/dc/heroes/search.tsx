import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { useFetcher } from '@remix-run/react'

import { HeroListResult } from '~/components/hero/HeroResult'
import { FormField } from '~/routes/login'
import { getDCHeroes } from '~/services/heroes.server'
import type { Hero } from '~/types'
export const meta: MetaFunction = () => ({ title: 'Herox/DC - Buscar héroe' })
export const loader = async ({ request }: LoaderArgs) => {
	const url = new URL(request.url)
	const params = url.searchParams.get('name' ?? '')
	const heroes = await getDCHeroes()
	const filteredHeroesByName = heroes.filter((hero) => hero.name === params)

	return json({ heroes: filteredHeroesByName })
}

export default function SearchHeroes() {
	const fetcher = useFetcher<{ heroes: Hero[] }>()
	console.log(fetcher.data)
	const isSubmitting = fetcher.state === 'submitting'
	return (
		<>
			<fetcher.Form
				method="get"
				className="flex flex-col items-center justify-center p-3 space-x-5 space-y-3 xl:space-y-0 xl:flex-row"
			>
				<FormField
					label="Nombre del heroe"
					name="name"
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
		</>
	)
}
