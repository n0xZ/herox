import { useLoaderData } from '@remix-run/react'
import type { Hero } from '~/types'

export const loader = async () => {
	const API_URL = process.env.API_URL!
	const res = await fetch(API_URL)
	const heroes = (await res.json()) as Hero[]

	return heroes
}
export default function HeroList() {
	const loaderData = useLoaderData<typeof loader>()
	console.log(loaderData)
	return <div>HeroList</div>
}
