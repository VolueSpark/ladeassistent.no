import React, { useCallback, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Image from 'next/image'
import { Button, SimpleDropdown, Icon } from '@/components/UI'
import useResize from '@/src/hooks/useResize'
import { useTranslation } from '@/i18n'

import style from './navbar.module.scss'
import { quicksand } from '@/src/utils/fonts'

const LANGUAGES: { label: string; value: string }[] = [
    { label: 'Norsk', value: 'nb' },
    { label: 'English', value: 'en' },
]

const texts = {
    charging_assistant: {
        nb: 'Ladeassistenten',
        en: 'Charging assistant',
    },
    settings: {
        nb: 'Innstillinger',
        en: 'Settings',
    },
    faq: {
        nb: 'Spørsmål og svar',
        en: 'FAQ',
    },
    button: {
        log_in: {
            nb: 'Logg inn',
            en: 'Log in',
        },
        log_out: {
            nb: 'Logg ut',
            en: 'Log out',
        },
    },
    mobile: {
        menu: {
            nb: 'Meny',
            en: 'Menu',
        },
    },
}

const MOBILE_BEAKPOINT = 584

export default function Navbar() {
    const { t, language } = useTranslation()
    const router = useRouter()

    const { width } = useResize()
    const isMobile = width <= MOBILE_BEAKPOINT

    const modalRef = React.createRef<HTMLDivElement>()
    const navRef = React.createRef<HTMLUListElement>()
    const openRef = React.createRef<HTMLButtonElement>()
    const {
        isMenuVisible,
        setMenuVisible,
        isNestedMenuVisible,
        setNestedMenuVisible,
    } = useHamBurgerMenu(modalRef, navRef, openRef, isMobile)

    const onChange = (value: string) => {
        router.push(router.asPath, router.asPath, { locale: value })
    }

    return (
        <div className={style.wrapper}>
            <div className={style.group__left}>
                <Link href="/" className={style.link}>
                    <Image
                        src="/icons/logo.svg"
                        alt="Spark logo"
                        width={24}
                        height={48}
                        className={style.icon}
                    />
                    <p className={quicksand.className}>Ladeassistenten</p>
                </Link>
            </div>
            <div className={style.group__right}>
                <LanguageDropDown language={language} onChange={onChange} />
                <div className={style.buttonContainer}></div>
            </div>
            <div className={style.mobile__nav} ref={modalRef}>
                <Button
                    variant="icon"
                    icon="/icons/menu.svg"
                    onClick={() => setMenuVisible(true)}
                    ref={openRef}
                />
                <nav
                    id="mobile-menu"
                    aria-labelledby="mobile-menu"
                    aria-hidden={!isMobile ? undefined : !isMenuVisible}
                    className={`${style.header__nav} ${
                        !isMenuVisible && style.header__nav__hidden
                    }`}
                >
                    <div className={style.header__title}>
                        <h4>{t(texts.mobile.menu)}</h4>
                        <Button
                            variant="icon"
                            icon="/icons/close.svg"
                            onClick={() => setMenuVisible(!isMenuVisible)}
                        />
                    </div>
                    <ul ref={navRef} className={style.header__list}>
                        <div className={style.list__item}>
                            <Link href="/" className={style.link}>
                                {t(texts.charging_assistant)}
                            </Link>
                            <Image
                                src="/icons/chevron-right.svg"
                                alt="Icon of arrow pointing right"
                                width={16}
                                height={16}
                            />
                        </div>
                        <div
                            className={style.list__item}
                            onClick={() => setNestedMenuVisible(true)}
                        >
                            <div className={style.row}>
                                <p>Velg språk </p>
                                <Icon
                                    iconName="language"
                                    width={16}
                                    height={16}
                                />
                            </div>
                            <Image
                                src="/icons/chevron-right.svg"
                                alt="Icon of arrow pointing right"
                                width={16}
                                height={16}
                            />
                        </div>
                    </ul>
                </nav>
                <nav
                    id="mobile-menu-nested"
                    className={`${style.header__nav__nested} ${
                        !isNestedMenuVisible &&
                        style.header__nav__nested__hidden
                    }`}
                    aria-labelledby="mobile-menu-nested"
                    aria-hidden={
                        !isMobile
                            ? undefined
                            : !isNestedMenuVisible || !isMenuVisible
                    }
                    // Need to create new ref to allow smooth animation and backwards clicking
                    // Discuss intended behaviour with someone
                >
                    <Button
                        variant="icon"
                        icon="/icons/close.svg"
                        onClick={() => setNestedMenuVisible(false)}
                    />
                    <ul className={style.header__list}>
                        {LANGUAGES.map((language) => (
                            <div
                                key={language.value}
                                className={style.list__item}
                                onClick={() => {
                                    setNestedMenuVisible(false)
                                    onChange(language.value)
                                }}
                            >
                                <p>{language.label}</p>
                                <Image
                                    src="/icons/chevron-right.svg"
                                    alt="Icon of arrow pointing right"
                                    width={16}
                                    height={16}
                                />
                            </div>
                        ))}
                    </ul>
                </nav>
            </div>
        </div>
    )
}

function useHamBurgerMenu<
    T extends HTMLElement,
    U extends HTMLElement,
    R extends HTMLElement
>(
    modalRef: React.RefObject<T>,
    ulRef: React.RefObject<U>,
    closeButton: React.RefObject<R>,
    isMobile: boolean
) {
    const [isMenuVisible, setMenuVisible] = useState(false)
    const [isNestedMenuVisible, setNestedMenuVisible] = useState(false)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (
                !isMenuVisible ||
                closeButton.current?.contains(e.target as Node)
            )
                return

            if (!e.target || !modalRef.current?.contains(e.target as Node)) {
                setMenuVisible(false)
            }
        }
        document.body.addEventListener('click', handleClickOutside)
        return () =>
            document.body.removeEventListener('click', handleClickOutside)
    }, [isMenuVisible, closeButton, ulRef, modalRef])

    const handleTabKey = useCallback(
        (e: KeyboardEvent) => {
            const focusableModalElements =
                modalRef.current?.querySelectorAll<HTMLElement>(
                    '[role="button"],a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
                ) ?? []
            const allFocusables =
                document.querySelectorAll<HTMLElement>(
                    '[role="button"],a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
                ) ?? []

            const first = focusableModalElements[0]
            const last =
                focusableModalElements[focusableModalElements.length - 1]
            const next =
                Array.from(allFocusables).find(
                    (_, i) => allFocusables[i - 1] === document.activeElement
                ) ?? null
            const previous =
                Array.from(allFocusables).find(
                    (_, i) => allFocusables[i + 1] === document.activeElement
                ) ?? null

            // On normal tabbing. If next element is outside modal, jump to first element
            if (!e.shiftKey && !modalRef.current?.contains(next)) {
                first?.focus()
                return e.preventDefault()
            }

            // On "reversed" tabbing. If previous element is outside modal, jump to last element
            if (e.shiftKey && !modalRef.current?.contains(previous)) {
                last?.focus()
                return e.preventDefault()
            }

            // Not start or end, follow normal tab flow.
        },
        [modalRef]
    )

    useEffect(() => {
        function keyListener(e: KeyboardEvent) {
            if (!isMenuVisible || !isMobile) {
                return
            }
            if (e.key === 'Escape') {
                return setMenuVisible(false)
            }
            if (e.key === 'Tab') {
                return handleTabKey(e)
            }
        }
        document.addEventListener('keydown', keyListener)
        return () => document.removeEventListener('keydown', keyListener)
    }, [isMenuVisible, isMobile, handleTabKey])

    return {
        isMenuVisible,
        setMenuVisible,
        isNestedMenuVisible,
        setNestedMenuVisible,
    }
}

function LanguageDropDown({
    language,
    onChange,
}: {
    language: string
    onChange: (value: string) => void
}) {
    return (
        // TODO: This should use a variant of the Dropdown component
        <SimpleDropdown
            id="language"
            name="language"
            value={language}
            onChange={onChange}
            icon="language"
            options={LANGUAGES}
        />
    )
}
