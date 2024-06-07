import { createContext } from "react";
export const StoreContext = createContext(null)

import { food_list } from "../assets/assets";

const StoreContextprovider = (props)=>{



    const contextValue={
        food_list
    }

    return(
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextprovider