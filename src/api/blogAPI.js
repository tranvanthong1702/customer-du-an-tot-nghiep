import Instance from "./instance";


export const getAll = () => {
    const url = "/blog"
    return Instance.get(url)
}
export const getById = (id) => {
    const url = `blog/detail/${id}`
    return Instance.get(url)
}