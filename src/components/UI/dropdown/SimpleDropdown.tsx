import { useTranslation } from '@/i18n'
import Icon from '../icon'
import style from './simpleDropdown.module.scss'

const texts = {
    select: {
        nb: 'Velg',
        en: 'Select',
    },
}

type SimpleDropdownProps = {
    id: string
    name?: string
    value: string
    onChange: (value: string) => void
    label?: string
    icon?: string
    options: {
        value: string
        label: string
    }[]
    disabled?: boolean
}

export default function SimpleDropdown({
    id,
    name,
    value,
    onChange,
    label,
    icon,
    options,
    disabled,
}: SimpleDropdownProps) {
    const { t } = useTranslation()

    return (
        <div className={style.container}>
            <div>
                {icon && (
                    <Icon
                        iconName={icon}
                        imageAlt={`An icon representing the ${id} input option`}
                        width={16}
                        height={16}
                    />
                )}
                {label && <label>{label}</label>}
                <select
                    aria-label={id}
                    name={name ?? id}
                    id={id}
                    className={style.select}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    disabled={disabled}
                >
                    <option disabled value="">
                        {t(texts.select)}
                    </option>
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
                <Icon
                    className={style.icon}
                    iconName="expand_more"
                    width={12}
                    height={7}
                />
            </div>
        </div>
    )
}
