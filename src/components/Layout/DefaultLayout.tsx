import {ReactNode} from "react";
import Navbar from "../Navbar/Navbar";
import { getLocale } from "next-intl/server";

export default async function DefaultLayout({children}: { children: ReactNode }) {
    const locale = await getLocale();

    return (
        <>
           <Navbar />
              {children}
        </>
    )
}