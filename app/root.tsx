import type { LinksFunction, MetaFunction } from '@remix-run/node'
import {
	Links,
	LiveReload,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from '@remix-run/react'
import { useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import styles from '~/styles/app.css'

export const meta: MetaFunction = () => ({
	charset: 'utf-8',
	title: 'New Remix App',
	viewport: 'width=device-width,initial-scale=1',
})

export const links: LinksFunction = () => [
	{ rel: 'stylesheet', href: styles },
	{
		rel: 'stylesheet',
		href: 'https://fonts.bunny.net/css?family=inter:400|ubuntu-condensed:400"',
	},
]

export default function App() {
	const [IsMounted, setIsMounted] = useState(false)
	useEffect(() => {
		const handleMount = () => setIsMounted(true)
		handleMount()
	}, [])

	return (
		<html lang="en" data-theme="autumn">
			<head>
				<Meta />
				<Links />
			</head>
			<body className="font-inter">
				<Outlet />
				{IsMounted && <Toaster />}
				<ScrollRestoration />
				<Scripts />
				<LiveReload />
			</body>
		</html>
	)
}
