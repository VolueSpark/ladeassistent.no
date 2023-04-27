import SmartCharging from '@/components/SmartCharging'
import { useTranslation } from '@/i18n'
import Layout from '@/src/layout'
import style from '@/styles/Home.module.scss'
import { InferGetStaticPropsType, GetServerSidePropsContext } from 'next'

const texts = {
    headers: {
        main: {
            nb: 'Spark Smart Lading',
            en: 'Spark Smart Charging',
        },
        sub: {
            nb: 'Viser deg når det er best tid å lade el-bilen din!',
            en: 'Showing you the best time to charge your EV!',
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
                    <h2 className={style.title}>{t(texts.headers.main)}</h2>
                    <h4>{t(texts.headers.sub)}</h4>
                </header>

                {showChargingPlan ? (
                    <SmartCharging controls={true} />
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
