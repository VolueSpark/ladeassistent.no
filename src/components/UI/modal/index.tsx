import { useEffect, useRef, useState } from 'react'
import style from './modal.module.css'
import { createPortal } from 'react-dom'

type ModalProps = {
    children: React.ReactNode
    onOutsideClick?: () => void
}

export default function Modal({ children, onOutsideClick }: ModalProps) {
    const modalRef = useRef<HTMLDivElement | null>(null)
    const [element, setElement] = useState<HTMLDivElement | null>()

    useEffect(() => {
        if (!element)
            setElement(document.getElementById('modal') as HTMLDivElement)
    }, [])

    useEffect(() => {
        const handleOutsideClick = (e: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(e.target as HTMLDivElement)
            ) {
                if (typeof onOutsideClick === 'function') onOutsideClick()
            }
        }
        document.addEventListener('mousedown', handleOutsideClick)
        return () =>
            document.removeEventListener('mousedown', handleOutsideClick)
    }, [])

    return (
        <>
            {element &&
                createPortal(
                    <div className={style.wrapper}>
                        <div className={style.container} ref={modalRef}>
                            {children}
                        </div>
                    </div>,
                    element
                )}
        </>
    )
}
