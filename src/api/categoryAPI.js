import Instance from "./instance";

const CategoryAPI ={
    getAll(){
        const url = "/category"
        return Instance.get(url)
    },
    getById(id){
        const url = `/detail/${id}`
        return Instance.get(url)
    },
    addCategory(data){
        const url ='/category/store'
        return Instance.post(url,data)
    }
}
export default CategoryAPI