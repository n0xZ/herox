import type { Hero } from '~/types'

type HeroItemProps = {
	hero: Hero
}
export const HeroItemResult = ({ hero }: HeroItemProps) => {
	return (
		<>
			<article className="shadow-xl card w-96 bg-base-100">
				<figure className="px-10 pt-10">
					<img
						src={hero.images.sm}
						alt={`Imagen de ${hero.name}`}
						className="rounded-xl"
					/>
				</figure>
				<aside className="items-center text-center card-body">
					<h3 className="card-title">{hero.name.toUpperCase()}</h3>
					<p
						className={`${
							hero.biography.alignment === 'good'
								? 'badge badge-primary'
								: 'badge badge-error'
						}`}
					>
						{hero.biography.alignment.toUpperCase()}
					</p>
					{Object.values(hero.powerstats).map((element, id) => (
						<p key={id}>
							{Object.keys(hero.powerstats)[id].toUpperCase()} : {element}
						</p>
					))}
				</aside>
			</article>
		</>
	)
}

export const HeroListResult = ({ heroes }: { heroes: Hero[] }) => {
	return (
		<section className="grid grid-cols-1 gap-3 mb-3 xl:grid-cols-3 place-items-center">
			{heroes.map((hero) => (
				<HeroItemResult hero={hero} key={hero.id} />
			))}
		</section>
	)
}
