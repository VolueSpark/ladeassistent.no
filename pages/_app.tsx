import '@/styles/globals.css'
import { AppProps } from 'next/app'
import { krub, nunitoSans } from '@/src/utils/fonts'
import { useEffect, useState } from 'react'
import { Language, LanguageProvider } from '@/i18n'
import { useRouter } from 'next/router'

export default function CustomApp({ Component, pageProps }: AppProps) {
    const router = useRouter()
    const [activeLanguage, setActiveLanguage] = useState('nb')

    // Sets the active language based on code in url
    useEffect(() => {
        if (router.locale) setActiveLanguage(router.locale)
    }, [router])

    return (
        <LanguageProvider value={activeLanguage as Language}>
            <style jsx global>{`
                html,
                select,
                input {
                    font-family: ${nunitoSans.style.fontFamily};
                }

                h1,
                h2,
                h3 {
                    font-family: ${krub.style.fontFamily};
                    font-weight: 400;
                }
                h4 {
                    font-weight: 600;
                }
            `}</style>
            <Component {...pageProps} />
        </LanguageProvider>
    )
}
