import React from 'react';
import Logo from "@/app/components/logo";

const LoadingPage = () => {
    return (
        <div>
            <main
                style={{
                    backgroundImage: `url(background.jpeg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                    height: '100vh',
                    width: '100vw',
                }}
                className={"h-screen w-screen flex flex-col items-center justify-center"}
            >
                <div>
                    <Logo/>
                </div>
            </main>
        </div>
    );
};

export default LoadingPage;
