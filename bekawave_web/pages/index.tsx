import { useEffect, useState } from "react";

import DefaultLayout from "@/layouts/default";
import DashBoard from "@/pages/DashBoard";
import { Spinner } from "@nextui-org/spinner";
import { MouseIcon } from "lucide-react";

export default function IndexPage() {
  const [isScreenTooSmall, setIsScreenTooSmall] = useState(false);

  const checkScreenSize = () => {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    // Set your threshold here (e.g., 1024px width and 768px height)
    if (screenWidth < 1024 || screenHeight < 768) {
      setIsScreenTooSmall(true);
    } else {
      setIsScreenTooSmall(false);
    }
  };

  useEffect(() => {
    // Check the screen size when the component mounts
    checkScreenSize();

    // Add a resize listener to check the size when the user resizes the window
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, []);

  if (isScreenTooSmall) {
    return (
      <div
        className={
          "flex flex-col items-center justify-center w-screen h-screen space-y-4"
        }
      >
        <MouseIcon color={"#4799df"} size={30} />
        <span className={"text-gray-700 font-baloo"}>
          Please open the page on full screen
        </span>
      </div>
    );
  }

  return (
    <DefaultLayout>
      <DashBoard />
    </DefaultLayout>
  );
}
