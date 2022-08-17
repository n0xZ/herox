import type { ActionArgs, LoaderArgs } from '@remix-run/node'
import { redirect } from '@remix-run/node'


import { requireUserPreference, logout } from '~/utils/session.server'

export const action = async ({ request }: ActionArgs) => {
	return logout(request)
}
export const loader = async ({ request }: LoaderArgs) => {
	const data = await requireUserPreference(request)
	if (data === 'Marvel Comics') return redirect('/private/marvel')
	return redirect('/private/dc')
}
