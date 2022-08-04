import { v4 as uuidv4 } from 'uuid';

export const getUUID = () => {
    let uuid = localStorage.getItem('GETUUID')
    if (!uuid) {
        uuid = uuidv4()
        localStorage.setItem('GETUUID', uuid)
    }
    return uuid
}