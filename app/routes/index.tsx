import { Link } from '@remix-run/react'
import HeroLandingImage from '../../public/hero-landing.png'
export default function Landing() {
	return (
		<main className="h-screen bg-base-100 font-lato">
			<section className="h-full hero ">
				<article className="flex-col hero-content lg:flex-row">
					<img
						src={HeroLandingImage}
						className="rounded-lg shadow-md"
						height={500}
						width={500}
						alt="Imagen principal de la Landing Clox"
					/>
					<aside className="text-center">
						<h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-blue-500">
							Busca y arma tu equipo favorito del universo de comics!
						</h1>
						<p className="py-6 text-gray-500">
							En Herox, puedes elegir y añadir distíntos personajes a tu equipo, ya sea
							del mundo Marvel  y DC.
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
