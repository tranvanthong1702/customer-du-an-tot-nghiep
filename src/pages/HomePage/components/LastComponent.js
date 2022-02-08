import React from "react";
import TopNew from "./TopNew";
import TopSale from "./TopSale";

function LastComponent({product}) {
    return (
        <section className="latest-product spad">
            <div className="container">
                <div className="row">
                    <TopNew product={product}/>
                    <TopSale product={product}/>
                    <TopSale product={product}/>
                </div>
            </div>
        </section>
    )
}

export default LastComponent