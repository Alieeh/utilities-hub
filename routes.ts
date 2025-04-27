export const domainName = "http://localhost:3000"

/** 
* An array of public routes that do not 
* require authentication
* @type {string[]}
*/
export const publicRoutes = [
    "/",
    "/auth",
    "/auth/new-verification",
];


/** 
* An array of routes that are used for authentication
* @type {string[]}
*/
export const authRoutes = [
    "/auth/login",
    "/auth/register",
    "/auth/error",
    "/auth/reset",
    "/auth/new-password",
]


/** 
* The prefix for API authentication routes
* Routes that start with this prefix are used for API
* authentication purposes
* @type {string}
*/
export const apiAuthPrefix = "/api/auth/";

/**
 * The default redirect path after login
 * * @type {string}
 * */
export const DEFAULT_LOGIN_REDIRECT = "/";