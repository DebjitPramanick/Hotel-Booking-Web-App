import { getDownloadURL, ref, uploadBytesResumable } from '@firebase/storage'
import moment from 'moment'
import { toast } from 'react-toastify'
import { storage } from "./Firebase"

export const getDate = (d) => {
    return moment(d).format('DD/MM/YYYY')
}

export const getEasyDate = (d) => {
    let dT = moment(d).format('Do MMMM, YYYY')
    return dT
}

export const isDate = (d) => {
    let dT = moment(d).isValid()
    return dT
}

export const imageUpload = async(file, refPath, subject) => {
    if (!file) alert("No file found.")
    const reference = ref(storage, refPath)
    const uploadTask = uploadBytesResumable(reference, file)
    uploadTask.on(
        "state_changed",
        snapshot => {
            const prog = Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
            )
        },
        error => {
            toast.error(error, {
                autoClose: 5500,
                pauseOnHover: true
            })
        },
    )
    let res = await getDownloadURL(reference).then(url => url)
    return res;
}