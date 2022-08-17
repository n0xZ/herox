import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'
import { Outlet, useLoaderData } from '@remix-run/react'

import DCLayout from '~/layouts/dc'
import MarvelLayout from '~/layouts/marvel'
import { requireUserPreference, logout } from '~/utils/session.server'

export const action = async ({ request }: ActionArgs) => {
	return logout(request)
}
export const loader = async ({ request }: LoaderArgs) => {
	const data = await requireUserPreference(request)
	return data
}

export default function PrivateOutlet() {
	const prefData = useLoaderData<typeof loader>()

	if (prefData === 'Marvel Comics')
		return (
			<MarvelLayout>
				<Outlet />
			</MarvelLayout>
		)
	return (
		<DCLayout>
			<Outlet />
		</DCLayout>
	)
}
