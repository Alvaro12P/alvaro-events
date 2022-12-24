import { createTheme, ThemeProvider, useMediaQuery } from '@mui/material'
import * as locales from '@mui/material/locale'
import { SessionProvider } from 'next-auth/react'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import React from 'react'
import Header from '../components/Header'
import '../styles/globals.css'

export const ColorModeCtx = React.createContext<{
  toggleColorMode: () => void
} | null>(null)

export default function App({ Component, pageProps }: AppProps) {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark')
  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
        document.body.classList.toggle('dark', mode !== 'dark')
      }
    }),
    [mode]
  )

  React.useEffect(() => {
    document.body.classList.toggle('dark', mode === 'dark')
  })

  const theme = React.useMemo(
    () =>
      createTheme(
        {
          palette: {
            mode
          }
        },
        locales['esES']
      ),
    [mode]
  )

  return (
    <>
      <Head>
        <title>Alvaro Vazquez DJ</title>
      </Head>
      <SessionProvider>
        <ColorModeCtx.Provider value={colorMode}>
          <ThemeProvider theme={theme}>
            <Header />
            <div className="h-screen w-screen gradient-bg flex items-center justify-center">
              <div className="w-screen md:w-5/6 lg:w-4/6 flex items-center justify-center flex-col">
                <Component {...pageProps} />
              </div>
            </div>
          </ThemeProvider>
        </ColorModeCtx.Provider>
      </SessionProvider>
    </>
  )
}
