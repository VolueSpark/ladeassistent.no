import { useTranslation } from '@/i18n'
import ChargingPlan from '@/components/chargingPlan'
import Layout from '@/src/layout'
import style from '@/styles/Home.module.scss'
import { InferGetStaticPropsType, GetServerSidePropsContext } from 'next'

const texts = {
    headers: {
        main: {
            nb: 'Hva koster det å lade nå?',
            en: 'How much will it cost to charge now?',
        },
    },
}

export const getServerSideProps = async function getServerSideProps(
    ctx: GetServerSidePropsContext
) {
    return {
        props: {
            showChargingPlan: process.env.SHOW_CHARGING_PLAN == 'true',
        },
    }
}

export default function Landing({
    showChargingPlan,
}: InferGetStaticPropsType<typeof getServerSideProps>) {
    const { t } = useTranslation()
    return (
        <Layout>
            <div className={style.primaryContainer}>
                <header>
                    <h1 className={style.title}>{t(texts.headers.main)}</h1>
                </header>

                {showChargingPlan ? (
                    <ChargingPlan />
                ) : (
                    <section className={style.chargingPlanDisabled}>
                        <h4>Ladeplanen er for øyeblikket utilgjengelig</h4>
                        <p>
                            Vi holder på å forbedre utregningenene våre, men vil
                            være tilbake så snart som mulig!
                        </p>
                    </section>
                )}
            </div>
        </Layout>
    )
}
