import { NavLink, Outlet } from '@remix-run/react'
import type { ReactNode } from 'react'

const PrivateLayout = ({ children }: { children: ReactNode }) => {
	return (
		<>
			<header className="sticky top-0 z-10 border-b-2 border-gray-100 bg-base-100">
				<nav className="container mx-auto font-bold navbar font-inter">
					<aside className="flex-1">
						<h1 className="text-xl normal-case btn btn-ghost">
							<NavLink to="/characters/home">Home</NavLink>
						</h1>
					</aside>
					<aside className="hidden space-x-4 navbar-end xl:flex">
						<ul className="p-0 space-x-3 menu menu-horizontal">
							<li tabIndex={0}>
								<span>
									Personajes
									<svg
										className="fill-current"
										xmlns="http://www.w3.org/2000/svg"
										width="20"
										height="20"
										viewBox="0 0 24 24"
									>
										<path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" />
									</svg>
								</span>
								<ul className="p-2 bg-base-100">
									<li>
										<NavLink to="/characters/view">Ver personajes</NavLink>
									</li>
									<li>
										<NavLink to="/characters/search">Buscar personajes</NavLink>
									</li>
								</ul>
							</li>
						</ul>
					</aside>
					<aside className=" navbar-end xl:hidden">
						<div className="dropdown dropdown-end">
							<label tabIndex={0} className="btn btn-ghost btn-circle">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									className="w-5 h-5"
									fill="none"
									viewBox="0 0 24 24"
									stroke="currentColor"
								>
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth="2"
										d="M4 6h16M4 12h16M4 18h7"
									/>
								</svg>
							</label>
							<ul
								tabIndex={0}
								className="p-2 mt-3 space-y-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52 "
							>
								<li>
									<NavLink to="/characters/view">Ver personajes</NavLink>
								</li>
								<li>
									<NavLink to="/characters/search ">Buscar personajes</NavLink>
								</li>
							</ul>
						</div>
					</aside>
				</nav>
			</header>
			<main className="min-h-screen font-lato">{children}</main>
		</>
	)
}
export default function PrivateOutlet() {
	return (
		<PrivateLayout>
			<Outlet />
		</PrivateLayout>
	)
}
