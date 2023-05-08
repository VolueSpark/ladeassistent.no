import router from 'next/router'

import style from './enrollment.module.css'
import { Button } from '../UI'

export default function Enrollment() {
    return (
        <div className={style.container}>
            <form onSubmit={handleSubmit}>
                <h4>Enroll your vehicle with Spark</h4>
                <label htmlFor="email">Email</label>
                <input
                    style={{ textAlign: 'center' }}
                    type="email"
                    name="email"
                    size={30}
                    required
                />
                <Button variant="primary" value="Submit" type="submit" />
            </form>
        </div>
    )
}

const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const target = event.target as any
    const response = await fetch(
        `/api/internal/enrollment?id=${target.email.value}`
    )
    if (response.status === 200) {
        const data = (await response.json()) as string
        router.push(data)
    }
}
