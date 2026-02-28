
import { Pathnames } from "next-intl/routing";

export const locales = ["en", "az"] as const;
export type Locale = (typeof locales)[number];

export const pathnames = {
    "/": "/",
 

} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = "always";

export type AppPathnames = keyof typeof pathnames;
