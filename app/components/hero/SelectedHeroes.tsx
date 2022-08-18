import { Link } from '@remix-run/react'
import { useSelectedHeroes } from '~/hooks/useSelectedHeroes'
import type { Hero } from '~/types'

const SelectedHero = ({
	hero,
	publisher,
}: {
	hero: Hero
	publisher: string
}) => {
	const { removeHeroFromLocalStorage } = useSelectedHeroes()
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
						onClick={() => removeHeroFromLocalStorage(hero)}
					>
						Eliminar de mi equipo
					</button>
				</div>
			</aside>
		</article>
	)
}
export default function SelectedHeroes({
	heroes,
	publisher,
}: {
	heroes: Hero[]
	publisher: string
}) {
	return (
		<section className="grid grid-cols-1 gap-3 mb-3 xl:grid-cols-3 place-items-center">
			{heroes.map((hero) => (
				<SelectedHero hero={hero} key={hero.id} publisher={publisher} />
			))}
		</section>
	)
}
