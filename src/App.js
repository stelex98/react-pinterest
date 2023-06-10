import WrapperLayout from "./components/WrapperLayout";
import SkeletonLayout from "./components/self-components/skeleton/SkeletonLayout";

import { Suspense } from "react";

function MyApp() {
  return (
    <Suspense fallback={<SkeletonLayout />}>
      <WrapperLayout />
    </Suspense>
  );
}

export default MyApp;
