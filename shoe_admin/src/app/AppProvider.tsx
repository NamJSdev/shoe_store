'use client'

import { createContext, useContext, useState } from "react";

const AppContext = createContext({  
    sessionToken:'',
    setSesstionToken:(sessionToken: string) => {}
})
export const useAppContext = () => {
    const context =  useContext(AppContext)
    if(!context){
        throw new Error('useAppConntext must be used within an AppProvider')
    }
    return context
}

export default function AppProvider({children,inititalSessionToken = ''}:
    {children: React.ReactNode
        inititalSessionToken ?: string
    }){
    const [sessionToken, setSesstionToken] = useState(inititalSessionToken)
    return(
        <AppContext.Provider value={{sessionToken,setSesstionToken}}>{children}</AppContext.Provider>
    )
}