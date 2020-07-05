import React, {useEffect, useState} from 'react';
import './App.css';

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



  return (
    <div>
        <h1>Clicker Bublichek</h1>

        <div>{repeatCount}</div>

        <button onClick={ () => {
            setRepeatCount(0);
            setBreakTimer(0);
        } }>Reset</button>

        <div>
            <span>If you need break timer set it before you start to count your repeats. </span>
            <span>Break timer:</span>
            <div>
                <div>
                    {breakTimer}
                </div>

                <button onClick={() => setBreakTimerDisplay(breakTimerDisplay + 1)}> + 1 minute</button>
                <span>{breakTimerDisplay}</span>
                <button onClick={() => breakTimerDisplay > 0 ? setBreakTimerDisplay(breakTimerDisplay - 1) : 0}> - 1 minute</button>
            </div>
        </div>

        <button onClick={ () => {
            setRepeatCount(repeatCount + 1);
            setBreakTimer(breakTimerDisplay * 60);
        } }>+ ADD</button>

        <button onClick={() => repeatCount > 0 ? setRepeatCount(repeatCount - 1) : 0}>- MINUS</button>

    </div>
  );
}

export default App;
