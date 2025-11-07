import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server'

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/sign-up(.*)', '/'])

/**
 * Middleware function to handle authentication using Clerk.
 * 
 * This middleware checks if the incoming request is for a public route.
 * If the route is not public, it invokes the `auth.protect()` method to enforce authentication.
 * 
 * @param auth - The authentication object provided by Clerk.
 * @param req - The incoming request object.
 * 
 * @returns A promise that resolves when the middleware completes its execution.
 */
export default clerkMiddleware(async (auth, req) => {
  if (!isPublicRoute(req)) await auth.protect()
})

export const config = {
  matcher: [
    '/((?!.*\\..*|_next).*)', '/', '/(api|trpc)(/.*)'
  ],
}