import { useCallback, useEffect, useState } from 'react'

import style from './Modal.module.css'

type ModalProps<T extends HTMLDivElement> = {
    children: React.ReactNode
    modalRef: React.RefObject<T>
    isVisible?: boolean
}

export default function Modal<T extends HTMLDivElement>({
    children,
    modalRef,
    isVisible,
}: ModalProps<T>) {
    return (
        <div className={style.wrapper} ref={modalRef}>
            <div
                className={`${style.container} ${
                    isVisible ? '' : style.container_hidden
                }`}
            >
                {children}
            </div>
        </div>
    )
}

export function useModal<
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
