import { useCallback, useEffect, useState } from 'react'
import type { Hero } from '~/types'

export const usePagination = (contentToPaginate: Hero[]) => {
	const [pagination, setPagination] = useState(12)
	const [heroesPaginated, setHeroesPaginated] = useState(
		contentToPaginate.slice(0, 20)
	)
	const [scrollPosition, setScrollPosition] = useState(0)
	const [clientHeight, setClientHeight] = useState(0)
	const [heroContainerHeight, setHeroContainerHeightHeight] = useState(0)

	//Se declara un useEffect que se encargará unicamente de tomar los eventos de scroll, y de actualizar los valores de los estados de Scroll y de clientHeight
	useEffect(() => {
		const scrollListener = () => {
			setClientHeight(window.innerHeight)
			setScrollPosition(window.scrollY)
		}
		if (typeof window !== 'undefined') {
			window.addEventListener('scroll', scrollListener)
		}
		return () => {
			if (typeof window !== 'undefined') {
				window.removeEventListener('scroll', scrollListener)
			}
		}
	}, [])

	//El segundo useEffect se encargará de hacer la paginación de los heroes, basado en un condicional:
	//Si la posición del scroll, sumado al clientHeight y a 100 (un margen de altura para paginar), es mayor que el contenedor de HeroList, se realizará la correspondiente paginación
	useEffect(() => {
		if (heroContainerHeight === 0) return
		if (scrollPosition + clientHeight + 100 > heroContainerHeight) {
			setPagination((prev) => prev + 12)
			setHeroesPaginated(contentToPaginate.slice(0, pagination))
		}
	}, [scrollPosition, clientHeight])

	// Este useCallback se encargará de memoizar  el callback de la función, que en este caso, la función actualizará la altura del contenedor.
	//Esta función se volverá a recalcular únicamente cuando 'heroesPaginated' Tienda a cambiar. (Que en este caso, lo hará en el segundo useEffect)
	const heroContainer = useCallback(
		(node: HTMLElement) => {
			if (node !== null) {
				setHeroContainerHeightHeight(node.getBoundingClientRect().height)
			}
		},
		[heroesPaginated]
	)
	return { heroesPaginated, heroContainer }
}
