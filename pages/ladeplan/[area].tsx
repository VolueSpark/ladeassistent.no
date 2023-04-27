import { useRouter } from 'next/router'
import { useTranslation } from '../../i18n'
import { isPriceArea, PriceArea } from '../../src/utils/priceArea.helper'
import SmartCharging from '@/components/SmartCharging'

const texts = {
    invalid: {
        nb: 'Ugyldig område.',
        en: 'Invalid area.',
    },
}

export default function Area() {
    const { t } = useTranslation()
    const router = useRouter()
    const { area, areaSelector } = router.query

    return (
        <div style={{ minHeight: '100vh', padding: '3%' }}>
            {area && isPriceArea(area as string) ? (
                <SmartCharging
                    area={area as PriceArea}
                    controls={areaSelector === 'true'}
                />
            ) : (
                <div>{t(texts.invalid)}</div>
            )}
        </div>
    )
}
