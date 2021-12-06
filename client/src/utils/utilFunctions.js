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

export const getAge = (d) => {
    let cur = moment()
    let dob = moment(d).format('YYYY')
    var diff = cur.diff(dob, 'years')
    return diff
}


export const isDate = (d) => {
    let dT = moment(d).isValid()
    return dT
}

export const imageUpload = async (file, refPath) => {
    if (!file) {
        alert("No file found.")
        return
    }
    const reference = ref(storage, refPath)
    const uploadTask = uploadBytesResumable(reference, file)
    let promise

    uploadTask.on(
        "state_changed",
        snapshot => {},
        error => {
            toast.error(error, {
                autoClose: 5500,
                pauseOnHover: true
            })
        },
        () => {
            promise = getDownloadURL(uploadTask.snapshot.ref)
        }
    )
    return await Promise.resolve(uploadTask)
    .then(async res => 
        await Promise.resolve(promise)
        .then(url => url)
    )
}

export const bulkImageUpload = async (images, room) => {
    if (!images || images.length === 0) {
        alert("No file found.")
        return
    }
    const result = []

    await Promise.all(images.map(async (image, idx) => {
        let refPath = `images/rooms/${room.id}/roomImage${idx+1}`
        let url = await imageUpload(image, refPath)
        result.push(url)
    }));

    return result
}