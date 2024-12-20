import { Quicksand } from "next/font/google";
import "@/app/globals.css";
import BackDrop from "@/app/ui/BackDrop";
import { Suspense } from "react";

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
      </body>
      
    </html>
  );

}
