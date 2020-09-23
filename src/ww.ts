/*
 * @param {number} time seconds
 * @returns void post message type count
 */
/* eslint-disable */

let intervalId: any;


const countdown = (time: number) => {
    console.log('0', intervalId);
    if(intervalId){
        console.log('1', intervalId);
        clearInterval(intervalId);
    }

    let timeLeft = time;

    intervalId = setInterval(() => {

        if(timeLeft === 0) {
            clearInterval(intervalId);
            return;
        }

        timeLeft -= 1;

        // @ts-ignore
        // eslint-disable-next-line no-restricted-globals
        self.postMessage({
            type: 'count',
            data: timeLeft
        })
    }, 1000)
}

const resetCountdown = () => {
    clearInterval(intervalId);
}

self.addEventListener('message', event => {
    if(event.data.type === 'startCountdown'){
        countdown(event.data.data);
        return;
    }
    if(event.data.type === 'resetCountdown'){
        resetCountdown();
        return;
    }
})

export {}