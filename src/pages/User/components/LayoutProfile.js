import React from "react";
import MasterLayout from "../../../layout/MasterLayout";
import NavBarProfile from "./NavBarProfile";

function LayoutProfile({children}){
    return(
        <MasterLayout>
            <div className="container profile">
                <div className="row">
                    <NavBarProfile/>
                    {children}
                </div>
            </div>
        </MasterLayout>
    )
}
export default LayoutProfile