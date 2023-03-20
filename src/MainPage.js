import React from "react";

function MainPage({selectedmenu}){
    if(selectedmenu===null || selectedmenu ==="indexpage"){
        return(
            <>
                <div className="text-center">
                    <h1 className="display-4">Welcome to place where all your stories are available to the public!</h1>
                </div>
            </>
        );
    }
    else return null;
}
export default MainPage;