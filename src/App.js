import WrapperLayout from "./components/WrapperLayout";
import SkeletonLayout from "./components/self-components/skeleton/SkeletonLayout";

import { Suspense } from "react";

export default function MyApp() {
  return (
    <div className="root">
      <Suspense fallback={<SkeletonLayout />}>
        <WrapperLayout />
      </Suspense>
    </div>
  );
}
