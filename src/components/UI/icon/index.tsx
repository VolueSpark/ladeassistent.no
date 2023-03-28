import Image from 'next/image'

type IconProps = {
    iconName: string
    imageAlt?: string
    width?: number
    height?: number
    flip?: boolean
    className?: string
}

export default function Icon({
    iconName,
    imageAlt,
    width = 24,
    height = 24,
    flip = false,
    className,
}: IconProps) {
    return (
        <Image
            src={`/icons/${iconName}.svg`}
            alt={imageAlt || `${iconName} icon`}
            width={width}
            height={height}
            style={flip ? { transform: 'rotate(180deg)' } : undefined}
            className={className}
        />
    )
}
