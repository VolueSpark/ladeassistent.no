import { useTranslation } from '@/i18n'
import Layout from '@/src/layout'

import style from './contact.module.css'

const CONTACT_EMAIL = 'christian.brevik@volue.com'

const texts = {
    header: {
        nb: 'Kontakt oss',
        en: 'Contact us',
    },
    paragraph: {
        nb: 'Ta gjerne kontakt dersom du har spørsmål eller andre tilbakemeldinger relatert til Ladeassistenten. Vi gjør oppmerksom på at svartid er inntil 2 virkedager. Du kan også finne svar på ofte stilte spørsmål under',
        en: "Please contact us if you have any questions or feedback related to this website. We usually respond within 2 work-days. You might also find the answer you're looking for in our",
    },
    link: {
        nb: 'Spørsmål og svar',
        en: 'FAQ',
    },
    systemAdmin: {
        nb: `Send mail til systemansvarlig: ${CONTACT_EMAIL}`,
        en: `Send mail to system admin: ${CONTACT_EMAIL}`,
    },
}

export default function Contact() {
    const { t } = useTranslation()

    return (
        <Layout>
            <div className={style.container}>
                <h1 className={style.header}>{t(texts.header)}</h1>
                <p className={style.paragraph}>
                    {t(texts.paragraph)} {t(texts.link)}.
                </p>
                <p className={style.paragraph}>
                    {t(texts.systemAdmin)}{' '}
                    <a
                        className={style.link}
                        href="mailto: christian.brevik@volue.com"
                    >
                        christian.brevik@volue.com
                    </a>
                </p>
            </div>
        </Layout>
    )
}
