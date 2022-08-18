import { Form, NavLink } from '@remix-run/react'
import type { ReactNode } from 'react'


export default function DCLayout({ children }: { children: ReactNode }) {
	return (
		<>
			<header className="sticky top-0 z-10 text-gray-200 bg-black shadow-sm">
				<nav className="container mx-auto font-bold font-ubuntu navbar">
					<aside className="flex-1">
						<NavLink to="/private/dc">
							<img
								className="duration-100 ease-in rounded-lg hover:opacity-80 "
								height={60}
								width={60}
								title="Homepage"
								src="https://upload.wikimedia.org/wikipedia/commons/3/3d/DC_Comics_logo.svg"
								alt="Logo de DC "
							/>
						</NavLink>
					</aside>
					<aside className="hidden space-x-4 navbar-end xl:flex">
						<ul className="p-0 space-x-3 menu menu-horizontal">
							<li tabIndex={0}>
								<span className="text-lg">
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
								<ul className="p-2 text-lg bg-black w-72">
									<li>
										<NavLink to="/private/dc/heroes">Ver heroes</NavLink>
									</li>
									<li>
										<NavLink to="/private/dc/heroes/search">Buscar heroes</NavLink>
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
								className="p-2 mt-3 space-y-2 bg-black shadow menu menu-compact dropdown-content rounded-box "
							>
								<li>
									<NavLink to="/private/dc/heroes">Ver heroes</NavLink>
								</li>
								<li>
									<NavLink to="/private/dc/heroes/search">Buscar heroes</NavLink>
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
			<main className="min-h-screen font-lato">{children}</main>
		</>
	)
}
