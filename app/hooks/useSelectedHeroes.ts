import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

import type { Hero } from '~/types'

const getSelectedHeroes = () => {
	const selectedHeroes = JSON.parse(
		String(localStorage.getItem('selected-heroes'))
	) as Hero[]
	return selectedHeroes
}
export const useSelectedHeroes = () => {
	const [myHeroes, setMyHeroes] = useState<Hero[] | null>(null)

	useEffect(() => {
		if (typeof window !== 'undefined') {
			setMyHeroes(getSelectedHeroes())
		}
	}, [])

	const addHeroToLocalStorage = (char: Hero) => {
		if (localStorage.getItem('selected-heroes') === null) {
			const selectedHeroes = [] as Hero[]

			selectedHeroes.push(char)
			localStorage.setItem('selected-heroes', JSON.stringify(selectedHeroes))
			setMyHeroes(selectedHeroes)
			toast.success('GIF agregado con éxito')
		} else {
			const selectedHeroes = JSON.parse(
				String(localStorage.getItem('selected-heroes'))
			) as Hero[]

			selectedHeroes.push(char)

			localStorage.setItem('selected-heroes', JSON.stringify(selectedHeroes))
			setMyHeroes(selectedHeroes)
			toast.success('Personaje agregado al equipo con exito!')
		}
	}
	const removeHeroFromLocalStorage = (char: Hero) => {
		const selectedHeroes = JSON.parse(
			String(localStorage.getItem('selected-heroes'))
		) as Hero[]
		const filteredHeroes = selectedHeroes.filter(
			(character) => char.id !== character.id
		)
		localStorage.setItem('selected-heroes', JSON.stringify(filteredHeroes))
		toast.success('Personaje eliminado del equipo con exito!')
		setMyHeroes(filteredHeroes)
	}
	return {
		myHeroes,
		addHeroToLocalStorage,
		removeHeroFromLocalStorage,
	}
}
