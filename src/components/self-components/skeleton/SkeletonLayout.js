import SkeletonCard from "./SkeletonCard";

function SkeletonLayout({ numberOfCards = 20 }) {
  const skeletonCards = [];

  for (let i = 0; i < numberOfCards; i++) {
    skeletonCards.push(<SkeletonCard />);
  }

  return <div className="skeleton-layout">{skeletonCards}</div>;
}

export default SkeletonLayout;
