import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function MasterLayout({children}){
    return(
        <div>
            <Header/>
            {children}
            <Footer/>
        </div>
    )
}
export default MasterLayout