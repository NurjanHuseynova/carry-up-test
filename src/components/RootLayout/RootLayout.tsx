import { Fragment } from "react";
import Navbar from "../Navbar/Navbar";


export default async function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;

}>) {
 

  return (
    <Fragment>
      <Navbar />
      {children}
    </Fragment>
  );
}
