import { Button, Settings } from '@voluespark/spark.elements'
import { useEffect, useState } from 'react'
import { useTranslation } from '@/i18n'

import style from './style.module.css'
import { texts } from './texts'
import Modal from '@/components/UI/modal'
import { useRouter } from 'next/router'
import Model from '../model'
import Interval from '../interval'
import Charger from '../charger'
import ModelList from './ModelList'

export default function Edit() {
    const { t } = useTranslation()
    const router = useRouter()

    const [isModalVisible, setModalVisible] = useState(false)
    const [editingMode, setEditingMode] = useState('')

    const [ev, setEv] = useState<string>('')
    const [evCapacity, setEvCapacity] = useState<string>('')
    const [chargerCapacity, setChargerCapacity] = useState<string>('')
    const [chargingPercentageStart, setChargingPercentageStart] =
        useState<string>('')
    const [chargingPercentageStop, setChargingPercentageStop] =
        useState<string>('')
    const [evImage, setEvImage] = useState('')

    useEffect(() => {
        setEv(localStorage.getItem('ev')?.replaceAll('"', '') ?? '')
        setEvCapacity(
            localStorage.getItem('ev_capacity')?.replaceAll('"', '') ?? ''
        )
        setChargerCapacity(
            localStorage.getItem('charger_capacity')?.replaceAll('"', '') ?? ''
        )
        setChargingPercentageStart(
            localStorage
                .getItem('charging_percentage_start')
                ?.replaceAll('"', '') ?? ''
        )
        setChargingPercentageStop(
            localStorage
                .getItem('charging_percentage_stop')
                ?.replaceAll('"', '') ?? ''
        )
        setEvImage(localStorage.getItem('ev_image')?.replaceAll('"', '') ?? '')
    }, [editingMode])

    const deleteCar = () => {
        localStorage.setItem('ev', '')
        localStorage.setItem('ev_capacity', '')
        localStorage.setItem('charger_capacity', '')
        localStorage.setItem('charging_percentage_start', '')
        localStorage.setItem('charging_percentage_stop', '')
        localStorage.setItem('ev_image', '')
        router.push('/')
    }

    const handleItemClick = (value: Array<string>) => {
        setEditingMode(value[0])
    }

    return (
        <div className={style.container}>
            <Settings
                title={t(texts.title)}
                car={{
                    brand: ev,
                    model: ev,
                    batteryCapacity: parseInt(evCapacity),
                    img: (
                        <img
                            className={style.image}
                            src={evImage}
                            alt="Image of vehicle"
                        />
                    ),
                }}
                parameters={{
                    chargerCapacity: parseInt(chargerCapacity),
                    chargingInterval: [
                        parseInt(chargingPercentageStart),
                        parseInt(chargingPercentageStop),
                    ],
                }}
                info={t(texts.info)}
                onItemClick={handleItemClick}
                buttonValue={t(texts.button_delete)}
                onButtonClick={() => setModalVisible(true)}
            />
            {isModalVisible && (
                <Modal onOutsideClick={() => setModalVisible(false)}>
                    <div className={style.modal__container}>
                        <div>
                            <p className={style.modal__header}>
                                {t(texts.modal.header)}
                            </p>
                            <p className={style.modal__content}>
                                {t(texts.modal.content)}
                            </p>
                        </div>
                        <div className={style.modal__controls}>
                            <Button variant="warning" onClick={deleteCar}>
                                {t(texts.button_delete)}
                            </Button>
                            <Button
                                variant="outlined"
                                onClick={() => setModalVisible(false)}
                            >
                                {t(texts.button_cancel)}
                            </Button>
                        </div>
                    </div>
                </Modal>
            )}
            {editingMode && (
                <Modal onOutsideClick={() => setEditingMode('')}>
                    <div
                        className={`${style.modal__container} ${style.modal__container__large}`}
                    >
                        {editingMode === 'brand' && (
                            <ModelList
                                onModelSelect={() => setEditingMode('')}
                            />
                        )}
                        {editingMode === 'chargingInterval' && (
                            <Interval
                                controlsValue={t(texts.button_save)}
                                controlsOnClick={() => setEditingMode('')}
                                range={[
                                    parseInt(chargingPercentageStart),
                                    parseInt(chargingPercentageStop),
                                ]}
                            />
                        )}
                        {editingMode === 'chargerCapacity' && (
                            <Charger
                                controlsValue={t(texts.button_save)}
                                controlsOnClick={() => setEditingMode('')}
                            />
                        )}
                    </div>
                </Modal>
            )}
        </div>
    )
}
