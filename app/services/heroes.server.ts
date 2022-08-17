import type { Hero } from '~/types'

export const getHeroes = async () => {
	const API_URL = process.env.API_URL!
	const res = await fetch(API_URL)
	const heroes = (await res.json()) as Hero[]
	return heroes
}
export const getMarvelHeroes = async () => {
	const API_URL = process.env.API_URL!
	const res = await fetch(API_URL)
	const heroes = (await res.json()) as Hero[]
	const marvelHeroes = heroes.filter(
		(hero) => hero.biography.publisher === 'Marvel Comics'
	)
	return marvelHeroes
}
export const getDCHeroes = async () => {
	const API_URL = process.env.API_URL!
	const res = await fetch(API_URL)
	const heroes = (await res.json()) as Hero[]
	const marvelHeroes = heroes.filter(
		(hero) => hero.biography.publisher === 'DC Comics'
	)
	return marvelHeroes
}

export const getHeroesByPublisher = async (publisher?: string) => {
	const heroes = await getHeroes()
	const heroesByPublisher = heroes.filter(
		(hero) =>
			hero.biography.publisher?.replace('', '-').toLowerCase() === publisher
	)
	return heroesByPublisher
}
