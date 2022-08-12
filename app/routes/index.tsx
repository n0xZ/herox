import { useLoaderData } from '@remix-run/react'
import type { Hero } from '~/types'

export const loader = async () => {
	const res = await fetch('https://akabab.github.io/superhero-api/api/all.json')
	const data = (await res.json()) as Hero[]
	return data
}

export default function Landing() {
	return (
		<section>
			<article className="min-h-screen">
      </article>
			<article className="min-h-screen"></article>
			<article className="min-h-screen"></article>
		</section>
	)
}
