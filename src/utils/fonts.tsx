import { Nunito_Sans, Quicksand } from '@next/font/google'
import { Krub } from '@next/font/google'

export const nunitoSans = Nunito_Sans({
    subsets: ['latin'],
    weight: ['200', '300', '400', '600', '700'],
})
export const krub = Krub({
    subsets: ['latin'],
    weight: ['200', '300', '400', '500', '600', '700'],
})

export const quicksand = Quicksand({
    weight: ['300', '400', '500', '600', '700'],
    subsets: ['latin'],
})
