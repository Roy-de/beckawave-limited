import DefaultLayout from "@/layouts/default";
import HomePage from "@/pages/HomePage";
import LoadingPage from "@/pages/LoadingPage";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <HomePage />
      {/*<LoadingPage />*/}
    </DefaultLayout>
  );
}
