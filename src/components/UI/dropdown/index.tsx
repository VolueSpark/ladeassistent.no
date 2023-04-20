import Icon from '../icon'
import style from './dropdown.module.scss'

type DropdownProps = {
    id: string
    testId?: string
    name?: string
    value: string
    onChange: (value: string) => void
    label: string
    options: {
        value: string
        label: string
    }[]
    disabled?: boolean
    borderBottom?: boolean
    size?: 'default' | 'large'
}

export default function Drodown({
    id,
    testId,
    name,
    value,
    onChange,
    label,
    options,
    disabled,
    borderBottom = true,
    size = 'default',
}: DropdownProps) {
    return (
        <div
            className={`${style.container} ${
                !borderBottom && style.no_border
            } ${size === 'large' && style.large}`}
        >
            <div>
                <select
                    data-testid={testId}
                    aria-label={label}
                    name={name ?? id}
                    id={id}
                    className={style.select}
                    value={value}
                    onChange={(event) => onChange(event.target.value)}
                    disabled={disabled}
                >
                    <option disabled value="">
                        Velg fra listen
                    </option>
                    {options.map((o) => (
                        <option key={o.value} value={o.value}>
                            {o.label}
                        </option>
                    ))}
                </select>
                <Icon iconName="expand_more" width={12} height={7} />
            </div>
        </div>
    )
}
