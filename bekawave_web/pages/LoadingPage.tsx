import React, { useState } from "react";
import { Spinner } from "@nextui-org/spinner";

import Logo from "@/components/logo";

const LoadingPage: React.FC = () => {
  const [animationComplete, setAnimationComplete] = useState(false);
  const [, setShowSpinner] = useState(false);

  const handleAnimationComplete = () => {
    setAnimationComplete(true);
    setTimeout(() => {
      setShowSpinner(true);
    }, 1500);
  };

  return (
    <div
      className={
        "space-y-20 h-screen w-screen flex flex-col items-center justify-center bg-gradient-to-tr from-[#0e1c35] via-black to-[#1a032a]"
      }
    >
      {!animationComplete ? (
        <Logo onAnimationComplete={handleAnimationComplete} />
      ) : (
        <>
          <Logo onAnimationComplete={handleAnimationComplete} />
          <div className={"fixed bottom-72"}>
            <Spinner />
          </div>
        </>
      )}
    </div>
  );
};

export default LoadingPage;
