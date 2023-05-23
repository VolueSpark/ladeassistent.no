import style from './input.module.css'

type InputProps = {
    name: string
    value: string
    label: string
    onChange: (value: string) => void
}

export default function Input({ name, value, label, onChange }: InputProps) {
    return (
        <input
            name={name}
            type="text"
            value={value}
            onChange={(event) => onChange(event.target.value)}
            placeholder={label}
            className={style.input}
        />
    )
}
