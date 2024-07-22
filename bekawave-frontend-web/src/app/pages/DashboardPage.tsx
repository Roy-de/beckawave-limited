import React from 'react';
import BottomNavBar from "@/app/components/BottomNavBar";

const DashboardPage = () => {
    return (
        <div>
            <main
                style={{backgroundImage: `url(background.jpeg)`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', height: '100vh', width: '100vw',}}
                className={"h-screen w-screen flex flex-col items-center justify-center"}>
                <div className={"grid grid-cols-2 grid-rows-4 h-screen w-screen p-4"}>
                    <div className={"col-start-1 row-start-1 bg-blue-600 h-full w-full"}></div>
                    <div className={"col-start-1 row-start-2 bg-green-600 h-full w-full"}></div>
                    <div className={"col-start-1 row-start-3 bg-purple-600 h-full w-full"}></div>
                    <div className={"col-start-1 row-start-4 bg-indigo-600 h-full w-full"}></div>
                    <div className={"col-start-2 row-start-1 bg-yellow-600 h-full w-full"}></div>
                    <div className={"col-start-2 row-start-2 bg-slate-600 h-full w-full"}></div>
                    <div className={"col-start-2 row-start-3 bg-amber-600 h-full w-full"}></div>
                    <div className={"col-start-2 row-start-4 bg-red-600 h-full w-full"}></div>
                </div>
                <div>
                    <BottomNavBar/>
                </div>
            </main>
        </div>
    );
};

export default DashboardPage;
