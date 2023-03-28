import style from './spinner.module.css'

export default function Spinner() {
    return (
        <svg className={style.spinner} viewBox="0 0 24 24">
            <circle
                className={style.path}
                cx="12"
                cy="12"
                r="9"
                fill="none"
                strokeWidth="4"
            ></circle>
        </svg>
    )
}
