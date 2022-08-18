import { Link } from '@remix-run/react'

import MarvelLandingAsset from '../../public/marvel.landing.webp'
import DCLandingAsset from '../../public/dc.landing.webp'
export default function Landing() {
	return (
		<main className="h-full min-h-screen text-zinc-900 font-lato">
			<section className="h-full mb-4 hero">
				<article className="flex-col hero-content lg:flex-row">
					<img
						src={MarvelLandingAsset}
						className="duration-100 ease-in rounded-lg shadow-md hover:opacity-60"
						height={400}
						width={400}
						alt="Imagen principal de la Landing Clox"
					/>
					<aside className="text-center ">
						<h1 className="text-4xl font-bold ">
							Busca y arma tu equipo favorito del universo de comics
						</h1>
						<p className="py-6 text-lg">
							En Herox, puedes elegir a qué mundo pertenecer, y armar tu equipo de
							superheroes en base a ello. Diviertete en Herox!
						</p>
						<Link to="/login" className="btn btn-secondary">
							Empezar ya
						</Link>
					</aside>
				</article>
			</section>
		</main>
	)
}
