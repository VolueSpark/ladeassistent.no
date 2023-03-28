import { Coin } from '@voluespark/spark.elements'
import { getHours, parseISO } from 'date-fns'

import style from './chargeNow.module.css'

// TODO: temp type declaration, move to eventual API call
export type PriceTimeRangeAdvice = {
    from: string
    to: string
    type: PriceTimeRangeAdviceType
    cost: number
}
export type PriceTimeRangeAdviceType = 'Now' | 'Best' | 'Worst' | 'Avoid'

type ChargeNowProps = {
    price: number
    best?: PriceTimeRangeAdvice
    worst?: PriceTimeRangeAdvice
    now: PriceTimeRangeAdvice
    priceUnit?: string
    details?: string
}

export default function ChargeNow({
    price,
    best,
    worst,
    now,
    priceUnit = 'kr',
    details = 'inkl. MVA',
}: ChargeNowProps) {
    return (
        <>
            <div>
                <Coin
                    price={Math.round(price)}
                    priceUnit={priceUnit}
                    advice={now}
                    details={details}
                />
            </div>
            {best && worst && (
                <div className={style.dynamic_text}>
                    <DynamicAdviceText {...{ price, best, worst, now }} />
                </div>
            )}
        </>
    )
}

// TODO: need to solve following early on:
// 1. Check dates. If time falls outside of same calender day we need to handle this in the text.
// 2. Check to see if best/worst and now overlaps.
function DynamicAdviceText({ best, worst }: ChargeNowProps) {
    return (
        <p>
            Beste tidspunkt i dag er{' '}
            <b>
                {getHours(parseISO(best!.from))} -{' '}
                {getHours(parseISO(best!.to))}
            </b>
            . Det vil da koste <b>{Math.round(best!.cost)} kr</b>. Du bør helst
            unngå å lade mellom{' '}
            <b>
                {getHours(parseISO(worst!.from))} -{' '}
                {getHours(parseISO(worst!.to))}{' '}
            </b>
            .
        </p>
    )
}
