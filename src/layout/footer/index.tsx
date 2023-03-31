import { useTranslation } from '@/i18n'
import { quicksand } from '@/src/utils/fonts'
import Image from 'next/image'
import Link from 'next/link'
import style from './footer.module.css'

const texts = {
    contact: {
        nb: 'Kontakt oss',
        en: 'Contact us',
    },
    github: {
        nb: 'Github',
        en: 'Github',
    },
    docs: {
        nb: 'Dokumentasjon',
        en: 'Documentation',
    },
}

export default function Footer() {
    const { t } = useTranslation()

    return (
        <footer className={style.container}>
            <span className={style.iconGroup}>
                <Image
                    src="/icons/footer-icon.svg"
                    alt="Spark icon on footer"
                    width={26}
                    height={48}
                />
                <p className={`${quicksand.className} ${style.title}`}>
                    LADEASSISTENTEN
                </p>
            </span>
            <div className={style.content}>
                <Link href="/kontakt">{t(texts.contact)}</Link>
                <Link href="https://github.com/VolueSpark/ladeassistent.no">
                    {t(texts.github)}
                </Link>
                <Link href="https://docs.voluespark.com/">{t(texts.docs)}</Link>
            </div>
            <div className={style.brand}>
                <p>Powered by </p>
                <Image
                    src="/icons/volue.svg"
                    alt="Volue logo"
                    width={49.37}
                    height={13.95}
                />
            </div>
        </footer>
    )
}
