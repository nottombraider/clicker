import React, {useEffect, useState} from 'react';
import './App.css';
import {wakeLockScreen} from "./index";

function App() {

    const [repeatCount, setRepeatCount] = useState(0);
    const [breakTimer, setBreakTimer] = useState(0);
    const [breakTimerDisplay, setBreakTimerDisplay] = useState(0);
    const [timerId, setTimerId] = useState();

    const countDown = () => {
        if(timerId){
            clearTimeout(timerId);
        }
        const idTimeOut = setTimeout(() => {
            console.log(breakTimer);
            setBreakTimer(breakTimer - 1);
        }, 1000);
        setTimerId(idTimeOut);
    };

    useEffect(() => {
        if(breakTimer) {
            countDown()
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [breakTimer])

    useEffect(() => {
        const interval = setInterval(async () => {
            console.log('wakelock is called')
            await wakeLockScreen();
        }, 60 * 1000);

        return () => clearInterval(interval);
    })

  return (
    <div className="app flex column app-landscape">
        <header>
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

                        <button className="count-change-btn minute-minus-btn"
                                onClick={() => breakTimerDisplay > 0 ? setBreakTimerDisplay(breakTimerDisplay - 1) : 0}> -1 min </button>
                        <span className="number-display timer-number-display timer-number-display-landscape">{breakTimerDisplay}</span>
                        <button className="count-change-btn minute-plus-btn"
                                onClick={() => setBreakTimerDisplay(breakTimerDisplay + 1)}> +1 min </button>

                    </div>
                </div>

                <div className="counter-card repeat-counter-display ">
                    <span>Your repeats:</span>
                    <div className="number-display number-display-landscape repeat-number-display">{repeatCount}</div>

                    <button className="reset-btn reset-btn-landscape"
                            onClick={ () => {
                                setRepeatCount(0);
                                setBreakTimer(0);
                                setBreakTimerDisplay(0);
                            } }>
                        <i className="fa fa-repeat" aria-hidden="true"/>
                    </button>
                </div>
            </div>


            <div className="repeat-controls flex space-between column-landscape">
                <button className="count-change-btn bottom-btn-style bottom-btn-style-landscape btn-minus btn-minus-landscape btn-minus-desktop"
                        onClick={() => repeatCount > 0 ? setRepeatCount(repeatCount - 1) : 0}>
                    <i className="fa fa-minus" aria-hidden="true"/>
                </button>

                <button className="count-change-btn bottom-btn-style bottom-btn-style-landscape btn-plus btn-plus-desktop"
                        onClick={ () => {
                            setRepeatCount(repeatCount + 1);
                            setBreakTimer(breakTimerDisplay * 60);
                        } }>
                    <i className="fa fa-plus" aria-hidden="true"/>
                </button>
            </div>
        </main>



    </div>
  );
}

export default App;
