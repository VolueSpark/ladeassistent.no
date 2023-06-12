import { AdviceGraph } from '@voluespark/spark.elements'
import { InfoText } from '../UI'
import { SpotPriceAdviceDTO } from '@/pages/api/spot-prices/[area]/advice'
import { texts } from './texts'

import style from './AdviceGraphWrapper.module.css'
import { useTranslation } from '@/i18n'

type AdviceGraphWrapperProps = {
    data: SpotPriceAdviceDTO
}

export default function AdviceGraphWrapper({ data }: AdviceGraphWrapperProps) {
    const { t } = useTranslation()
    return (
        <>
            {/* // TODO: remove this div */}
            <div className={style.container}>
                <div className={style.graph_container}>
                    <AdviceGraph
                        initialHeight={600}
                        data={data.spotPrices}
                        advice={data.advice as any}
                        priceUnit="øre"
                        energyUnit="kWh"
                        legend={{
                            Now: t(texts.legend.now),
                            Best: t(texts.legend.best),
                            Worst: t(texts.legend.worst),
                            Avoid: t(texts.legend.avoid),
                            Unknown: '',
                            Good: '',
                        }}
                        daysLabelText={{
                            today: t(texts.daysLabelText.today),
                            tomorrow: t(texts.daysLabelText.tomorrow),
                        }}
                    />
                </div>
            </div>
            <InfoText>{t(texts.infoText)}</InfoText>
        </>
    )
}
