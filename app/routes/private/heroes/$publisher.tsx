import type { LoaderArgs } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'
import { useEffect } from 'react'
import { HeroListResult } from '~/components/hero/HeroResult'
import { getHeroByPublisher } from '~/services/heroes.server'
import type { Hero } from '~/types'

export const loader = async ({ params }: LoaderArgs) => {
	return getHeroByPublisher(params.publisher)
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
