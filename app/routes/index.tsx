import { Link } from '@remix-run/react'

import MarvelLandingAsset from '../../public/marvel.landing.webp'
import DCLandingAsset from '../../public/dc.landing.webp'
export default function Landing() {
	return (
		<main className="h-full min-h-screen bg-black text-zinc-300 font-lato">
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
						<h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
							Busca y arma tu equipo favorito del universo de comics
						</h1>
						<p className="py-6 text-lg">
							En Herox, puedes elegir y añadir distíntos personajes a tu equipo, ya sea
							del mundo <span>Marvel</span> y <span className="text-blue-800">DC</span>
							.
						</p>
						<Link to="/login" className="btn btn-secondary">
							Empezar ya
						</Link>
					</aside>
				</article>
			</section>
			<section className="h-full hero ">
				<article className="flex-col hero-content lg:flex-row">
					<aside className="text-center">
						<h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
							Disfruta del inmenso contenido abastecido por Marvel y DC
						</h1>
						<p className="py-6 text-lg"></p>
						<Link to="/login" className="btn btn-secondary">
							Empezar ya
						</Link>
					</aside>
					<img
						src={DCLandingAsset}
						className="duration-100 ease-in rounded-lg shadow-md hover:opacity-60"
						height={400}
						width={400}
						alt="Imagen principal de ilustración de DC."
					/>
				</article>
			</section>
		</main>
	)
}
