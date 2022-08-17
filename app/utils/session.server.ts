import { createCookieSessionStorage, redirect } from '@remix-run/node'

const sessionSecret = process.env.SESSION_SECRET!

const storage = createCookieSessionStorage({
	cookie: {
		name: 'USER_SESSION',
		secure: process.env.NODE_ENV === 'production',
		secrets: [sessionSecret],
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
	},
})
export async function getSession(request: Request) {
	const cookie = request.headers.get('Cookie')
	return storage.getSession(cookie)
}

export async function getUserPreferences(
	request: Request
): Promise<string | undefined> {
	const session = await getSession(request)
	const prefs = session.get('comicPreference')
	return prefs
}

export async function getUserId(request: Request): Promise<string | undefined> {
	const session = await getSession(request)
	const userId = session.get('userId')
	return userId
}
export async function createUserSession(userId: string, comic: string) {
	const session = await storage.getSession()
	session.set('userId', userId)
	session.set('comicPreference', comic)
	return redirect('/private', {
		headers: {
			'Set-Cookie': await storage.commitSession(session),
		},
	})
}
export const redirectBasedOnPrefs = async (request: Request) => {
	const prefs = await requireUserPreference(request)
	if (prefs === 'Marvel Comics') return redirect('/private/marvel/')
}
export async function requireUserPreference(
	request: Request,
	redirectTo: string = new URL(request.url).pathname
): Promise<string | undefined> {
	const preferences = await getUserPreferences(request)
	if (!preferences) {
		const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
		throw redirect(`/login?${searchParams}`)
	}
	return preferences
}
export async function requireUserId(
	request: Request,
	redirectTo: string = new URL(request.url).pathname
) {
	const userId = await getUserId(request)
	if (!userId) {
		const searchParams = new URLSearchParams([['redirectTo', redirectTo]])
		throw redirect(`/login?${searchParams}`)
	}
	return userId
}

export async function logout(request: Request) {
	const session = await getSession(request)
	return redirect('/', {
		headers: {
			'Set-Cookie': await storage.destroySession(session),
		},
	})
}
