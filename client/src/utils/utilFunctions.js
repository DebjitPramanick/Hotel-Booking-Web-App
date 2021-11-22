import moment from 'moment'

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