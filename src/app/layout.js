import { Quicksand } from "next/font/google";
import "@/app/globals.css";
import BackDrop from "@/app/ui/BackDrop";
import { Suspense } from "react";
import {Coffee}  from "@/app/ui/Coffee";
import Image from "next/image";
import Link from "next/link";

const quicksand = Quicksand({subsets: ['latin']});

export const metadata = {
  title: "ServeyService",
  description: "An app to create and take surveys",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
        
      <body className={`${quicksand} antialiased`} >
        <BackDrop>
          <Suspense>
            {children}
          </Suspense>
        </BackDrop>
        
        <Link href="/" className="home">
          <Image src="/home.png" alt="home" width="100" height="100" />                   
        </Link>
        
        <Coffee/>


      </body>
      
    </html>
  );

}
