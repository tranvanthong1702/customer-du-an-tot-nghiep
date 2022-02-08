import Instance from "./instance";


export const getTransport = () => {
    const url = 'transport/province/district'
    return Instance.get(url)
}
export const verifyEmail = (data) => {
    const url = 'order/verify/email'
    return Instance.get(url, {params: data})
}
export const priceShip = (total)=>{
    const url = `transport/price/${total}`
    return Instance.get(url)
}