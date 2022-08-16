import { Link } from '@remix-run/react'
import React from 'react'
import type { Hero } from '~/types'
type HeroItemProps = {
	character: Hero
}
export default function CharacterItem({ character }: HeroItemProps) {
	return (
		<article className="shadow-xl card w-96 bg-base-100 hover:opacity-80">
			<figure className="px-10 pt-10">
				<img
					src={character.images.md}
					alt={`Imagen de ${character.name}`}
					width={500}
					height={500}
					className="rounded-xl"
				/>
			</figure>
			<aside className="items-center text-center card-body">
				<h2 className="card-title">{character.name}</h2>
				<p
					className={`${
						character.biography.alignment === 'good'
							? 'badge badge-primary'
							: 'badge badge-error'
					}`}
				>
					{character.biography.alignment.toUpperCase()}
				</p>
				<div className="flex flex-col card-actions">
					<Link to={`/characters/${character.id}`} className="btn btn-primary w-44">
						Ver personaje
					</Link>
					<button className="btn btn-secondary w-44">Agregar a mi equipo</button>
				</div>
			</aside>
		</article>
	)
}
