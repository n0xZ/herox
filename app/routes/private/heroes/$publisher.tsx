import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'
import { HeroListResult } from '~/components/hero/HeroResult'
import type { Hero } from '~/types'

export const loader = async ({ params }: LoaderArgs) => {
	console.log(params.publisher)
	const API_URL = process.env.API_URL!
	const res = await fetch(API_URL)
	const heroes = (await res.json()) as Hero[]
	const filteredHeroes = heroes.filter(
		(hero) =>
			hero.biography.publisher?.replace('', '_').toLowerCase() !== params.publisher
	)

	return filteredHeroes
}

export default function PublisherContent() {
	const loaderData = useLoaderData()
 const params = useParams()
	return (
		<>
			<h2>Mundo {params.publisher} </h2>
			<HeroListResult heroes={loaderData} />
		</>
	)
}
