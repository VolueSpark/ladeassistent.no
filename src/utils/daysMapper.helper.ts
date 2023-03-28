const DAYS = [
    'sunday',
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
]

const LABELS = [
    'Søndag',
    'Mandag',
    'Tirsdag',
    'Onsdag',
    'Torsdag',
    'Fredag',
    'Lørdag',
]

// Convers int to appropriate day
export const daysValuesMapper = (days: number[]) => {
    return days.map((d) => DAYS[d])
}

export const daysLabelsMapper = (days: number[]) => {
    return days.map((d) => LABELS[d])
}

// Find the current day and next three dates
export const getDays = (date: Date) => {
    const today = date.getUTCDay()

    const days = []
    for (let i = 0; i < 7; i++) {
        days.push((today + i) % 7)
    }

    return days
}
