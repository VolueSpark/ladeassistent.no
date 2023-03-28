import { nunitoSans } from '@/src/utils/fonts'
import Image from 'next/image'
import React from 'react'

import style from './button.module.css'

type ButtonProps = {
    value?: string
    type?: 'button' | 'submit'
    variant?: 'primary' | 'secondary' | 'tertiary' | 'icon'
    onClick?: (event: React.SyntheticEvent<HTMLButtonElement>) => void
    disabled?: boolean
    icon?: string
    children?: React.ReactNode
    testID?: string
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
    (
        {
            value,
            type,
            variant,
            onClick,
            disabled,
            icon,
            children,
            testID,
        }: ButtonProps = {
            type: 'button',
            variant: 'primary',
            onClick: () => null,
        },
        ref
    ) => {
        return (
            <button
                type={type}
                data-testid={testID}
                className={`${nunitoSans.className} ${style.initial} ${
                    style[variant!]
                }`}
                onClick={onClick}
                disabled={disabled}
                ref={ref}
            >
                {variant === 'icon' && icon && (
                    <Image
                        src={icon}
                        alt="Button icon"
                        height={24}
                        width={24}
                    />
                )}
                {value}
                {children}
            </button>
        )
    }
)

Button.displayName = 'Button'

export default Button
