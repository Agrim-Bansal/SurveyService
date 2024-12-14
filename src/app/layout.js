import { Quicksand } from "next/font/google";
import "@/app/globals.css";
import BackDrop from "@/app/ui/BackDrop";

const quicksand = Quicksand();

export const metadata = {
  title: "ServeyService",
  description: "An app to create and take surveys",
};

export default function RootLayout({ children }) {

  return (
    <html lang="en">
        
      <body className={`${quicksand} antialiased`} >
        <BackDrop>
            {children}
        </BackDrop>
      </body>
    </html>
  );

}
