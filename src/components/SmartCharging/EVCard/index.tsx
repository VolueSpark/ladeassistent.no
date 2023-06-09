import Image from 'next/image'
import style from './EVCard.module.css'

type EVCardsProps = {
    name: string
    img: string
    percentageStart: number
    percentageStop: number
    charger: number
    onClick: () => void
}

export default function EVCard({
    name,
    img,
    percentageStart,
    percentageStop,
    charger,
    onClick,
}: EVCardsProps) {
    return (
        <div className={style.container} onClick={onClick}>
            <img className={style.image} src={img} alt="Image of vehicle" />
            <div>
                <p style={{ marginTop: 0 }}>{name}</p>
                <div className={style.chip__container}>
                    <Chip>
                        {percentageStart} - {percentageStop}%
                    </Chip>
                    <Chip>{charger} kW</Chip>
                </div>
            </div>
            <Image
                src="/icons/chevron-right.svg"
                width={16}
                height={16}
                alt="Icon indicating clickable element"
                className={style.chevron}
            />
        </div>
    )
}

function Chip({ children }: { children: React.ReactNode }) {
    return <div className={style.chip}>{children}</div>
}
