import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {

  return<>
  <Navigation />
   <Component {...pageProps} />
  
  </>
  
}


function Navigation() {
  return (
    <>
    <a href="/canvas" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700 transition">Second page</a>
    </>
      
    
  )
}
