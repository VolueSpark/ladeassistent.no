import { initLobot } from '@leile/lobo-t'

export enum Language {
    Norwegian = 'nb',
    English = 'en',
}

const lobot = initLobot<typeof Language>(Language.Norwegian)

export const LanguageProvider = lobot.LanguageProvider
export const useTranslation = lobot.useTranslation
