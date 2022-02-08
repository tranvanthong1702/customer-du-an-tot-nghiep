import Instance from "./instance";


export const getBlogs = () => {
    const url = '/blog'
    return Instance.get(url)
}