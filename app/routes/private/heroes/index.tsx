import type { MetaFunction } from '@remix-run/node'
import { Headers, json } from '@remix-run/node'
import { useLoaderData } from '@remix-run/react'
import { useCallback, useEffect, useState } from 'react'
import { HeroList } from '~/components/hero/HeroList'
import type { Hero } from '~/types'

export const meta: MetaFunction = () => ({
	title: 'Herox - Lista de superheroes',
})

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
	const [pagination, setPagination] = useState(12)
	const [heroesPaginated, setHeroesPaginated] = useState(loaderData.slice(0, 20))
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
			setHeroesPaginated(loaderData.slice(0, pagination))
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
	return (
		<>
			<h2 className="mt-6 text-4xl font-bold text-center ">
				Lista de personajes:
			</h2>

			{loaderData && (
				<HeroList heroes={heroesPaginated} heroContainer={heroContainer} />
			)}
		</>
	)
}
