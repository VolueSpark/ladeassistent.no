import { ForecastAdviceDTO } from '@/pages/api/forecast/[area]/advice'
import { ForecastTable } from '@voluespark/spark.elements'
import { InfoText } from '../UI'
import { texts } from './texts'
import { useTranslation } from '@/i18n'

import style from './ForecastTableWrapper.module.css'

type ForecastTableWrapperProps = {
    data: ForecastAdviceDTO
}

export default function ForecastTableWrapper({
    data,
}: ForecastTableWrapperProps) {
    const { t } = useTranslation()

    return (
        <>
            {/* // TODO: remove this div */}
            <div className={style.container}>
                <ForecastTable
                    data={data.forecastAdvice.map((f) => ({
                        ...f,
                        averagePrice: f.averagePrice * 100,
                    }))}
                    legend={{
                        good: t(texts.legend.good),
                        avoid: t(texts.legend.avoid),
                    }}
                />
            </div>
            <InfoText>{t(texts.infoText)}</InfoText>
        </>
    )
}
