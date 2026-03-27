"use client";
import { useLocale, useTranslations } from "next-intl";
import { locales, Locale } from '@/config';
import { usePathname, useRouter } from "@/navigation";
import {ReadonlyURLSearchParams, useParams} from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function LocaleSwitcher() {
  const t = useTranslations('LocaleSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams() as Record<string, string>;
  const searchParams : any = useSearchParams();

  const switchLocale = (nextLocale: Locale) => {
    const currentParams = new URLSearchParams(searchParams);


    
   if (currentParams?.size > 0) {
    // @ts-ignore
    router.replace({ pathname,  query: Object.fromEntries(currentParams) }, { locale: nextLocale });
   } else{
    // @ts-ignore
    router.replace({ pathname, params }, { locale: nextLocale });
   }
  };

  return (
    <select
      value={locale}
      onChange={(e) => switchLocale(e.target.value as Locale)}
      className=" border rounded-2xl bg-[#f8f5ff] md:flex items-center text-[#351B6F] custom-select !h-auto "
    >
   {locales
  
  .map((loc) => (
  <option key={loc} value={loc} disabled={loc === locale}>
  {loc}
</option>
))}
    </select>
  );
}
