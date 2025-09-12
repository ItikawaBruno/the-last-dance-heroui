import { ReactNode } from "react";

export default function AuthLayout({children}:{children:ReactNode}){
    return(
        <>
            <div className="h-screen w-screen bg-gradient-to-tr from-[#7A00E6] via-[#993399] to-[#CC00FF]">
                {children}
            </div>
        </>
    );
}