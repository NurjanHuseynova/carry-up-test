import { notFound } from "next/navigation";
import { getRequestConfig } from "next-intl/server";
import { locales } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
    let locale = await requestLocale;
  
    
    if (!locales.includes(locale as any)) notFound();

    try {
        const staticMessages = (await import(`../messages/${locale}.json`)).default;
        const messages = { ...staticMessages };
        return {
            locale,
            messages,
        };
    } catch (error) {
        console.error(error);
        return {
            locale,
            messages: {},
        };
    }
});