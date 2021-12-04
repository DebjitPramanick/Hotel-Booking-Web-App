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

export const imageUpload = async (file, refPath) => {
    if (!file) {
        alert("No file found.")
        return
    }
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

export const bulkImageUpload = async (images, room) => {
    if (!images || images.length === 0) {
        alert("No file found.")
        return
    }

    console.log(images)
    const promises = []
    const result = []

    images.map((image, idx) => {
        let refPath = `images/rooms/${room.id}/roomImage${idx+1}`
        let reference = ref(storage, refPath)
        let uploadTask = uploadBytesResumable(reference, image)
        promises.push(uploadTask)
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
            async () => getDownloadURL(uploadTask.snapshot.ref).
            then(url => result.push(url))
        )
    })
    
    console.log(result)

    return Promise.all(promises)
    .then((res) => {
        console.log(res)
        return result
    })
}