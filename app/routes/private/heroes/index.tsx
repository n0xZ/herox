import { Headers, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { HeroList } from '~/components/hero/HeroList'
import type { Hero } from '~/types'

export const loader = async () => {
	const headers = new Headers()
	headers.append('Cache-Control', 'max-age=604800')
	const API_URL = process.env.API_URL!
	const res = await fetch(API_URL, { headers })
	const heroes = (await res.json()) as Hero[]

	return json(heroes)
}

export default function HeroListPage() {
	const loaderData = useLoaderData<typeof loader>()

	return (
		<>
			<h2 className="mt-6 mb-6 text-4xl font-bold text-center">
				Lista de personajes:
			</h2>
			<HeroList characters={loaderData} />
		</>
	)
}
