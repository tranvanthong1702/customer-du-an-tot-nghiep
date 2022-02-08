import React from "react";
import MasterLayout from "../../layout/MasterLayout";
import FeatureComponent from "./components/FeatureComponent";
import BlogComponent from "./components/BlogComponent";
import SwiperComponent from "./components/SwiperComponent";
import LastComponent from "./components/LastComponent";
import DepartmentComponent from "./components/DepartmentComponent";
import BannerComponent from "./components/BannerComponent";
import useFetchAPI from "../../hooks/useFetchAPI";
import CategoryAPI from "../../api/categoryAPI";
import {getAll} from "../../api/productAPI";
import {getBlogs} from "../../api/blogsAPI";

function HomePage() {
    // @ts-ignore
    const category = useFetchAPI(CategoryAPI.getAll,[])
    const product = useFetchAPI(getAll,[])
    const blogs = useFetchAPI(getBlogs,[])
    return (
        <MasterLayout>
            <div>
                <DepartmentComponent category={category}/>
                {/* <SwiperComponent product={product}/> */}
                <FeatureComponent category={category} product={product}/>
                <BannerComponent/>
                <LastComponent product={product}/>
                <BlogComponent blogs={blogs}/>
            </div>
        </MasterLayout>
    )
}

export default HomePage