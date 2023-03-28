export function AND(...args: string[]) {
    return args.join(' ')
}

export function IF(condition: boolean, className: string) {
    return condition ? className : ''
}

export function OR(condition: boolean, classA: string, classB: string) {
    return condition ? classA : classB
}
