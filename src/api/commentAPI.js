import Instance from "./instance";


export const storeComment = (data) => {
    const url = '/comment/store'
    return Instance.post(url, data)
}
export const getAllComment = () => {
    const url = "/comment"
    return Instance.get(url)
}
export const getIdComment = (id) => {
    const url = `comment/comment/${id}`
    return Instance.get(url)
}