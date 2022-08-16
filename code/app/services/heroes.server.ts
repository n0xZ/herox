import type { Hero } from '~/types'

export const getHeroes = async () => {
	const API_URL = process.env.API_URL!
	const res = await fetch(API_URL)
	const heroes = (await res.json()) as Hero[]
	return heroes
}
export const getHeroByPublisher = async (publisher?: string) => {
	const heroes = await getHeroes()
	const heroesByPublisher = heroes.filter(
		(hero) =>
			hero.biography.publisher?.replace('', '-').toLowerCase() === publisher
	)
	return heroesByPublisher
}
