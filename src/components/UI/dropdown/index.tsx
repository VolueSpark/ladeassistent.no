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
}

export default function Dropdown({
    id,
    testId,
    name,
    value,
    onChange,
    label,
    options,
    disabled,
}: DropdownProps) {
    return (
        <div className={style.container}>
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
