import { ThemeProvider } from '@/contexts/theme'
import '@/styles/globals.scss'
import 'normalize.css'

function MyApp({ Component, pageProps }) {
  return (
    <ThemeProvider>
       <Component {...pageProps} />
    </ThemeProvider>
  )
}

export default MyApp
