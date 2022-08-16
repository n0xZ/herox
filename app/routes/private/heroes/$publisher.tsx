import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { useLoaderData, useParams } from '@remix-run/react'
import { HeroListResult } from '~/components/hero/HeroResult'
import { getHeroByPublisher } from '~/services/heroes.server'

const parseParams = (params?: string) => params?.replace('_', ' ')
export const meta: MetaFunction = ({ params }) => ({
	title: `Herox: ${parseParams(params.publisher)}`,
})
export const loader = async ({ params }: LoaderArgs) => {
	return getHeroByPublisher(params.publisher)
}

export default function PublisherContent() {
	const loaderData = useLoaderData()
	const params = useParams()

	return (
		<>
			<h2 className='text-3xl text-center'>Mundo {parseParams(params.publisher)} </h2>
			<HeroListResult heroes={loaderData} />
		</>
	)
}
