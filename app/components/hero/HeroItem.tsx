import { Link } from '@remix-run/react'
import { useSelectedHeroes } from '~/hooks/useSelectedHeroes'

import type { Hero } from '~/types'
type HeroItemProps = {
	hero: Hero
	publisher: string
}
export default function HeroItem({ hero, publisher }: HeroItemProps) {
	const { addHeroToLocalStorage } = useSelectedHeroes()
	return (
		<article className="duration-100 ease-in shadow-xl card w-80 bg-base-100 hover:-translate-y-1">
			<figure className="px-10 pt-10">
				<img
					src={hero.images.md}
					alt={`Imagen de ${hero.name}`}
					width={500}
					height={500}
					className="rounded-xl"
				/>
			</figure>
			<aside className="items-center text-center card-body">
				<h2 className="card-title">{hero.name}</h2>
				<p
					className={`${
						hero.biography.alignment === 'good'
							? 'badge badge-primary'
							: 'badge badge-error'
					}`}
				>
					{hero.biography.alignment.toUpperCase()}
				</p>
				<div className="flex flex-col card-actions">
					<Link
						to={`/private/${publisher}/heroes/${hero.id}`}
						className="btn btn-primary w-44"
					>
						Ver personaje
					</Link>
					<button
						className={`btn ${
							publisher === 'marvel' ? 'btn-error' : 'btn-secondary'
						} w-44`}
						onClick={() => addHeroToLocalStorage(hero)}
					>
						Agregar a mi equipo
					</button>
				</div>
			</aside>
		</article>
	)
}
