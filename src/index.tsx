import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import cogoToast from 'cogo-toast'

ReactDOM.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
    document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register({
    onUpdate: () => {
        cogoToast.info(
            'Application updated. Restart application to receive latest features.'
        )
    },
    onSuccess: () => {
        cogoToast.info('Application ready for offline')
    },
})

export const wakeLockScreen = async () => {
    try {
        // @ts-ignore
        const wakeLock = await navigator.wakeLock.request('screen')

        wakeLock.release()
        
return true
    } catch (error) {
        console.log(error)
        
return false
    }
}
