import Head from 'next/head'
import { ReactNode } from 'react'
import Navbar from './navbar'
import Footer from './footer'

import style from './layout.module.css'

type LayoutProps = {
    children: ReactNode
    title?: string
    description?: string
}

export default function Layout({ children, title, description }: LayoutProps) {
    return (
        <div>
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

            <main className={style.container}>
                <Navbar />
                <div className={style.bodyContainer}>{children}</div>
                <div id="modal"></div>
            </main>
            <Footer />
        </div>
    )
}
