import {Fugaz_One, Inter} from "next/font/google";
import "./globals.css";
import Link from "next/link";

const fugaz = Fugaz_One({subsets : ["latin"], weight: ['400']});
const inter = Inter({subsets : ["latin"]});

export const metadata = {
  title: "Practice",
  description: "Just practicing Next.Js",
};

// wraps current directory's page.js, and allof it's subdirectories' page.js' as children
// i.e. anything written before or after {children} (inside body) will remain constant for all subdirectory pages
export default function RootLayout({ children }) {
  const header = (
    <header className = 'p-4 sm:p-8 flex text-xl sm:text-2xl md:text-4xl justify-between gap-4 headgradient '>
      <Link href='/'>
        <h1 className= {' ' + fugaz.className}>
          Header
        </h1>
      </Link>
      <div className = {'flex items-center justify-between '}>
        PLACEHOLDER
      </div>
    </header>
  )

  const footer = (
    <footer className = 'p-4 sm:p-8 flex justify-center gap-4 '>
      <h1 className= {' ' + fugaz.className}>
        lol me made it :D
      </h1>
    </footer>
  )
  
  return (
    <html lang="en">
      <body className = {'w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-750 backgroundColor text-white ' + inter.className}>
        {header}
          {children}
        {footer}
      </body>
    </html>
  );
}
