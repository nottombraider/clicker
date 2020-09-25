import {useEffect} from "react";

export const useRequestPermissions = () => {
    useEffect(() => {
        if (Notification.permission === "default"){
            Notification.requestPermission()
        }
    }, [])
}