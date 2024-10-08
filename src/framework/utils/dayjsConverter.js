import dayjs from 'dayjs'

export const convertDatesToISOString = (data) => {
  const convert = (obj) => {
    const newObj = { ...obj }
    Object.keys(newObj).forEach((key) => {
      if (dayjs.isDayjs(newObj[key])) {
        newObj[key] = newObj[key].toISOString()
      }
    })
    return newObj
  }
  return convert(data)
}

export const convertISOStringToDayjs = (isoString) => {
  return dayjs(isoString)
}

export const formattedDate = (isoString) => {
  return dayjs(isoString).format('DD-MM-YYYY')
}
