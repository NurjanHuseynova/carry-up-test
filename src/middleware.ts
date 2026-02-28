import createMiddleware from 'next-intl/middleware';
import {pathnames, locales, localePrefix} from './config';

export default createMiddleware({
    defaultLocale: 'en',
    localeDetection : false,
    locales,
    pathnames,
    localePrefix
});

// export const config = {
//     matcher: ['/((?!api|_next|.*\\..*).*)'],
// };

export const config = {
    // matcher: ['/', '/(az|en)/:path*'],
    matcher: ["/((?!api|_next|_vercel|.*\\..*).*)"],
    
    // matcher: [
    //     // Enable a redirect to a matching locale at the root
    //     '/',
    //
    //     // Set a cookie to remember the previous locale for
    //     // all requests that have a locale prefix
    //     '/(az|en|ru)/:path*',
    //
    //     // Enable redirects that add missing locales
    //     // (e.g. `/pathnames` -> `/en/pathnames`)
    //     '/((?!_next|_vercel|.*\\..*).*)'
    // ]
};