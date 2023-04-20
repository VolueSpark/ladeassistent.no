import Dropdown from '../dropdown'
import { useTranslation } from '@/i18n'
import { texts } from './texts'

import style from './areaSelector.module.css'

type AreaSelectorProps = {
    value: string
    onChange: (arg0: string) => void
}

export default function AreaSelector({ value, onChange }: AreaSelectorProps) {
    const { t } = useTranslation()
    return (
        <div className={style.section}>
            <div>
                <p>{t(texts.my_area)}</p>
                <Dropdown
                    id="region"
                    testId={'spark-elements__price-region-dropdown'}
                    label={`${t(texts.dropdown.label)}`}
                    value={value}
                    onChange={onChange}
                    options={[
                        {
                            value: 'NO1',
                            label: `${t(texts.dropdown.options.east)} (NO1)`,
                        },
                        {
                            value: 'NO2',
                            label: `${t(texts.dropdown.options.south)} (NO2)`,
                        },
                        {
                            value: 'NO3',
                            label: `${t(texts.dropdown.options.center)} (NO3)`,
                        },
                        {
                            value: 'NO4',
                            label: `${t(texts.dropdown.options.north)} (NO4)`,
                        },
                        {
                            value: 'NO5',
                            label: `${t(texts.dropdown.options.west)} (NO5)`,
                        },
                    ]}
                />
            </div>
        </div>
    )
}
