import { createCookieSessionStorage, redirect } from '@remix-run/node'

const sessionSecret = process.env.SESSION_SECRET!
const storage = createCookieSessionStorage({
	cookie: {
		name: 'USER_SESSION',
		// normally you want this to be `secure: true`
		// but that doesn't work on localhost for Safari
		// https://web.dev/when-to-use-local-https/
		secure: process.env.NODE_ENV === 'production',
		secrets: [sessionSecret],
		sameSite: 'lax',
		path: '/',
		maxAge: 60 * 60 * 24 * 30,
		httpOnly: true,
	},
})
export async function createUserSession(userId: string) {
	const session = await storage.getSession()
	session.set('userId', userId)
	return redirect('/private', {
		headers: {
			'Set-Cookie': await storage.commitSession(session),
		},
	})
}
