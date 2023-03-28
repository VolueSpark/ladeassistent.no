import Head from 'next/head'
import { ReactNode, useState } from 'react'
import Navbar from './navbar'
import Footer from './footer'

import style from './layout.module.css'

type LayoutProps = {
    children: ReactNode
    title?: string
    description?: string
}

export default function Layout({ children, title, description }: LayoutProps) {
    const [hideOverflowY, setHideOverflowY] = useState(false)
    return (
        <div
            className={`${style.container} ${
                hideOverflowY && style.hide__overflow__y
            }`}
        >
            <Head>
                <title>{title ?? 'Ladeassistenten'}</title>
                <meta
                    name="description"
                    content={description ?? 'Ladeassistenten'}
                />
                <link rel="icon" href="/favicon.ico" />
                <meta
                    content="width=device-width, initial-scale=1"
                    name="viewport"
                />
            </Head>

            <main>
                <Navbar setHideOverflowY={setHideOverflowY} />
                <div className={style.bodyContainer}>{children}</div>
            </main>
            <Footer />
        </div>
    )
}
