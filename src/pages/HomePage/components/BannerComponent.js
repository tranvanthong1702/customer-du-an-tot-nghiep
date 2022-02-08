import React from "react";

function BannerComponent(){
    return(
        <div className="banner">
            <div className="container">
                <div className="row">
                    <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                        <div className="banner__pic">
                            <img src={require('../../../assets/images/banner-1.jpg').default} alt=""/>
                        </div>
                    </div>
                    <div className="col-lg-6 col-md-6 col-sm-6 mb-3">
                        <div className="banner__pic">
                            <img src={require('../../../assets/images/banner-2.jpg').default} alt=""/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default BannerComponent