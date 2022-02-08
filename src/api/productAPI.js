import Instance from "./instance";


export const getAll = () => {
    const url = "/product"
    return Instance.get(url)
}
export const getById = async (id) => {
    const url = `/product/detail/${id}`
    return Instance.get(url)
}
export const getByCate = async (id)=>{
    const url = `category/product/${id}`
    return Instance.get(url)
}