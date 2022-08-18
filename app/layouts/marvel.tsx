import { Form, NavLink } from '@remix-run/react'
import type { ReactNode } from 'react'
import MarvelLogo from '../../public/marvel-logo.svg'

export default function MarvelLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<header className="sticky top-0 z-10 text-gray-100 bg-black ">
				<nav className="container mx-auto font-bold navbar font-ubuntu">
					<aside className="flex-1">
						<NavLink
							to="/private/marvel"
							className="text-xl normal-case btn btn-ghost "
						>
							<img
								className="duration-100 ease-in rounded-lg hover:opacity-80 "
								height={100}
								width={100}
								src={MarvelLogo}
								alt="Logo de marvel "
							/>
						</NavLink>
					</aside>
					<aside className="hidden space-x-4 navbar-end xl:flex">
						<ul className="p-0 space-x-3 menu menu-horizontal">
							<li tabIndex={0}>
								<span>
									Heroes
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
								<ul className="p-2 bg-red-500">
									<li>
										<NavLink to="/private/marvel/heroes">Ver heroes</NavLink>
									</li>
									<li>
										<NavLink to="/private/marvel/heroes/search">Buscar heroes</NavLink>
									</li>
									<li>
										<NavLink to="/public/search-by-publisher">
											Buscar heroes por publisher
										</NavLink>
									</li>
									<li>
										<Form method="post">
											<button type="submit" name="_logout" value="true">
												Cerrar sesión
											</button>
										</Form>
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
								className="p-2 mt-3 space-y-2 bg-red-500 shadow menu menu-compact dropdown-content rounded-box w-52 "
							>
								<li>
									<NavLink to="/private/marvel/heroes">Ver heroes</NavLink>
								</li>
								<li>
									<NavLink to="/private/marvel/heroes/search">Buscar heroes</NavLink>
								</li>
								<li>
									<NavLink to="/public/search-by-publisher">
										Buscar heroes por publisher
									</NavLink>
								</li>
								<li>
									<Form method="post">
										<button type="submit" name="_logout" value="true">
											Cerrar sesión
										</button>
									</Form>
								</li>
							</ul>
						</div>
					</aside>
				</nav>
			</header>
			<main className="min-h-screen ">{children}</main>
		</>
	)
}
