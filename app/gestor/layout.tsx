import { ReactNode } from "react";
import SideBar from "./_components/page";


export default function ColaboradorLayout({children}:{children:ReactNode}){
    return(
        <>
            <div className="h-screen w-screen flex bg-[#f3cdff]">
                <SideBar></SideBar>
                <div className="h-[95%] w-full my-auto ml-1 mr-1">
                    {children}  
                </div>
            </div>
        </>
    );
}