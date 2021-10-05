/* eslint-disable */
import React, { useEffect, useState } from 'react'
import './App.css'
import { wakeLockScreen } from './index'
import ReactGA from 'react-ga'
//@ts-ignore
import Worker from 'worker-loader!./ww.ts';
import {useRequestPermissions} from "./requestPermissionHook";
ReactGA.initialize('UA-175640106-1')

const worker = Worker();



function App() {
    const [repeatCount, setRepeatCount] = useState(0)
    const [breakTimer, setBreakTimer] = useState(0)
    const [breakMinAmount, setBreakMinAmount] = useState(0)
    const [isWakeLock, setWakeLockState] = useState(false)

    useRequestPermissions();

    const countdownRepeatHandler = (time: number) => {

        setRepeatCount(repeatCount + 1);
        setBreakTimer(time);

        worker.postMessage({
                type: 'startCountdown',
                data: time
        });

        worker.addEventListener('message', (event: any) => {
            setBreakTimer(event.data.data)
        });

    };

    const resetCountdownHandler = () => {

        setRepeatCount(0)
        setBreakTimer(0)
        setBreakMinAmount(0)

        worker.postMessage({
            type: 'resetCountdown',
            data: breakMinAmount
        });

    }



    useEffect(() => {
        ReactGA.pageview(window.location.pathname + window.location.search)
    }, [])


    useEffect(() => {
        wakeLockScreen()
            .then(setWakeLockState)
            .then(() =>
                ReactGA.event({
                    label: 'wakeLockWorks',
                    value: Number(isWakeLock),
                    action: 'works',
                    category: 'wakeLock',
                })
            )

        document.addEventListener('visibilitychange', async () => {
            if (document.visibilityState === 'visible' && !isWakeLock) {
                const wakeLockStatus = await wakeLockScreen()

                setWakeLockState(wakeLockStatus)
            }
        })
    }, [isWakeLock])

    return (
        <div className="app flex column app-landscape">
            <header className="flex" style={{ alignItems: 'center' }}>
                <h1 className="title">Clicker Bublichek</h1>
            </header>

            <main className="main flex column row-landscape">
                <div className="counters flex column">
                    <div className="counter-card column timer-container-landscape flex">
                        <span>Break timer:</span>
                        <div>
                            <div className="number-display number-display-landscape timer-count-down-display">
                                {breakTimer}
                            </div>

                            <button
                                className="count-change-btn minute-minus-btn"
                                onClick={() =>
                                    breakMinAmount > 0
                                        ? setBreakMinAmount(
                                              breakMinAmount - 1
                                          )
                                        : 0
                                }
                            >
                                {' '}
                                -1 min{' '}
                            </button>
                            <span className="number-display timer-number-display timer-number-display-landscape">
                                {breakMinAmount}
                            </span>
                            <button
                                className="count-change-btn minute-plus-btn"
                                onClick={() =>
                                    setBreakMinAmount(breakMinAmount + 1)
                                }
                            >
                                {' '}
                                +1 min{' '}
                            </button>
                        </div>
                    </div>

                    <div className="counter-card repeat-counter-display ">
                        <span>Your repeats:</span>
                        <div className="number-display number-display-landscape repeat-number-display">
                            {repeatCount}
                        </div>

                        <button
                            className="reset-btn reset-btn-landscape"
                            onClick={() => {
                                resetCountdownHandler()
                            }}
                        >
                            <span>&#x27F3;</span>
                        </button>
                    </div>
                </div>

                <div className="repeat-controls flex space-between column-landscape">
                    <button
                        className="count-change-btn bottom-btn-style bottom-btn-style-landscape btn-minus btn-minus-landscape btn-minus-desktop"
                        onClick={() =>
                            repeatCount > 0
                                ? setRepeatCount(repeatCount - 1)
                                : 0
                        }
                    >
                        {<i className="fa fa-minus" aria-hidden="true" /> || <b>+</b>}
                    </button>

                    <button
                        className="count-change-btn bottom-btn-style bottom-btn-style-landscape btn-plus btn-plus-desktop"
                        onClick={() => {
                            countdownRepeatHandler(breakMinAmount * 60);
                        }}
                    >
                        {<i className="fa fa-plus" aria-hidden="true" /> || <b>-</b>}
                    </button>
                </div>
            </main>
        </div>
    )
}

export default App
