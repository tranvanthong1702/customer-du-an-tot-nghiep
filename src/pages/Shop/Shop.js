import React from "react";
import MasterLayout from "../../layout/MasterLayout";
import Banner from "./components/Banner";
import Sidebar from "./components/sidebar";
import { getAll } from "../../api/productAPI";
import CategoryAPI from "../../api/categoryAPI";
import ProductSingle from "./components/ProductSingle";
import useFetchAPI from "../../hooks/useFetchAPI";


function Shop() {
    window.scroll(0, 0)
    const categories = useFetchAPI(CategoryAPI.getAll, [])
    const products = useFetchAPI(getAll, [])
    const { data } = products
    console.log(data)
    return (
        <MasterLayout>
            <Banner />
            <section className="product spad">
                <div className="container">
                    <div className="row">
                        <Sidebar categories={categories} />
                        <div className="col-lg-9 col-md-7">
                            {/* <div className="filter__item">
                                <div className="row">
                                    <div className="col-lg-4 col-md-4">
                                        <div className="filter__found">
                                            <h6><span>{data?.length}</span> Products found</h6>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-5">
                                        <div className="filter__sort">
                                            <span>Sort By</span>
                                            <select>
                                                <option value={0}>Default</option>
                                                <option value={0}>Default</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-4 col-md-3">
                                        <div className="filter__option">
                                            <span className="icon_grid-2x2" />
                                            <span className="icon_ul" />
                                        </div>
                                    </div>
                                    <div className="col-lg-8 col-md-8">

                                    </div>
                                </div>
                            </div> */}
                            <ProductSingle products={products} categories={categories} />
                        </div>
                    </div>
                </div>
            </section>
        </MasterLayout>
    )
}

export default Shop