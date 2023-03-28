import { useEffect, useState } from 'react'

export default function useResize() {
    const [size, setSize] = useState({
        width: 0,
        height: 0,
    })

    useEffect(() => {
        function run() {
            setSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        run()

        window.addEventListener('resize', run)
        return () => window.removeEventListener('resize', run)
    }, [])

    return size
}
