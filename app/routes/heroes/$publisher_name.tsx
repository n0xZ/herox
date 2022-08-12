import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import type { Hero } from '~/types'

// el 'loader' se ejecutará previo a entra a la ruta, y hará el fetching de los heroes, a la vez que se hará el fitro basado en 'publisher-name'
export const loader = async ({ params }: LoaderArgs) => {
	const publisherParams = params.publisher_name
	if (!publisherParams) throw new Error('El parámetro no existe.')

	const API_URL = process.env.API_URL!
	const res = await fetch(API_URL)
	const heroes = (await res.json()) as Hero[]
	const filteredHeroesByPublisher = heroes.filter(
		(hero) => hero.biography.publisher === publisherParams
	)
	return filteredHeroesByPublisher
}
// 
export default function HeroesByPublisherName() {
	const loaderData = useLoaderData<typeof loader>()
	console.log(loaderData)
	return <section>HeroesByPublisherName</section>
}
