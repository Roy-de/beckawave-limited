import React from "react";
import { Spinner } from "@nextui-org/spinner";

import Logo from "@/components/logo";

const LoadingPage = () => {
  return (
    <div>
      <div className={"space-y-20 h-screen w-screen flex flex-col items-center justify-center"}>
        <Logo />
        <Spinner />
      </div>
    </div>
  );
};

export default LoadingPage;
