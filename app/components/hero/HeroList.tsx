import type { Hero } from '~/types'
import CharacterItem from './HeroItem'
type HeroListProps = {
	characters: Hero[]
}
export const HeroList = ({ characters }: HeroListProps) => {
	return (
		<section className="grid grid-cols-1 gap-3 mb-3 xl:grid-cols-3 place-items-center">
			{characters.map((character) => (
				<CharacterItem character={character} key={character.id} />
			))}
		</section>
	)
}
