import React from "react";
import {Cookies} from "react-cookie";

function Logout({select, selectedmenu}) {
    if (selectedmenu === "logout") {
        let cookies = new Cookies();
        cookies.remove("token");
        return (
            <>
                {() => select(null)}
            </>
        );
    }
    else  return null;
}

export default Logout;