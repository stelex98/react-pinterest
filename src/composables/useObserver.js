import { useRef } from "react";

function useTabComposable(callback) {
  const observer = useRef(
    new IntersectionObserver(
      (entries) => {
        const element = entries[0];

        if (element.isIntersecting) {
          callback();
        }
      },
      {
        rootMargin: "30px",
      }
    )
  );

  return {
    observer,
  };
}

export default useTabComposable;
