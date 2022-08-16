import type { Hero } from '~/types'
import CharacterItem from './HeroItem'
type HeroListProps = {
	heroes: Hero[]
	heroContainer: (node: HTMLElement) => void
}
export const HeroList = ({ heroes, heroContainer }: HeroListProps) => {
	return (
		<section
			className="grid grid-cols-1 gap-3 mt-2 mb-3 xl:grid-cols-3 place-items-center"
			ref={heroContainer}
		>
			{heroes.map((hero) => (
				<CharacterItem hero={hero} key={hero.id} />
			))}
		</section>
	)
}
