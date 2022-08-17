import type { Hero } from '~/types'
import CharacterItem from './HeroItem'
type HeroListProps = {
	heroes: Hero[]
	publisher: string
	heroContainer: (node: HTMLElement) => void
}
export const HeroList = ({
	heroes,
	heroContainer,
	publisher,
}: HeroListProps) => {
	return (
		<section
			className="grid grid-cols-1 gap-3 mt-4 mb-3 xl:grid-cols-3 lg:grid-cols-2 place-items-center"
			ref={heroContainer}
		>
			{heroes.map((hero) => (
				<CharacterItem hero={hero} key={hero.id} publisher={publisher} />
			))}
		</section>
	)
}
