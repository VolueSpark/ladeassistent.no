import { useTranslation } from '@/i18n'
import { AND } from '@/src/utils/classNames.helper'

import style from './ActiveComponentSelector.module.css'
import { Dropdown } from '@/components/UI'

const texts = {
    label: {
        nb: 'Viser',
        en: 'Showing',
    },
    options: {
        forecastTable: {
            nb: '7 dagers estimat',
            en: '7 day forecast',
        },
        adviceGraph: {
            nb: 'Spot priser',
            en: 'Spot prices',
        },
    },
}

type ActiveComponentSelectorProps = {
    value: string
    onChange: (value: string) => void
}

export default function ActiveComponentSelector({
    value,
    onChange,
}: ActiveComponentSelectorProps) {
    const { t } = useTranslation()
    return (
        <div className={AND(style.section, style.priceAreaSection)}>
            <div>
                <p className={style.label}>Showing</p>
                <Dropdown
                    id="region"
                    testId={'spark-elements__price-region-dropdown'}
                    label={`${t(texts.label)}`}
                    value={value}
                    onChange={onChange}
                    options={[
                        {
                            value: 'forecastTable',
                            label: `${t(texts.options.forecastTable)}`,
                        },
                        {
                            value: 'adviceGraph',
                            label: `${t(texts.options.adviceGraph)}`,
                        },
                    ]}
                    borderBottom={false}
                    size="large"
                />
            </div>
        </div>
    )
}
