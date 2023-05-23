import Layout from "./components/Layout";

export default function MyApp() {
  const cards = [
    {
      id: 1,
      img: "https://i.pinimg.com/236x/ae/b0/2f/aeb02fe5d0f294114aab9a0d5a05ec56.jpg",
      title: "Amazing title",
    },
    {
      id: 2,
      img: "https://i.pinimg.com/236x/91/24/94/9124949c76f4ae241c2595aebf4fc86c.jpg",
      title: "Amazing title",
    },
    {
      id: 3,
      img: "https://i.pinimg.com/236x/2b/cf/ce/2bcfce0099627ec0833383ddc6d635df.jpg",
      title: "Amazing title",
    },
    {
      id: 4,
      img: "https://i.pinimg.com/236x/ae/b0/2f/aeb02fe5d0f294114aab9a0d5a05ec56.jpg",
      title: "Amazing title",
    },
    {
      id: 5,
      img: "https://i.pinimg.com/236x/c3/7c/b6/c37cb60a25cc9e1713f1010ebd22fe24.jpg",
      title: "Amazing title",
    },
    {
      id: 6,
      img: "https://i.pinimg.com/236x/91/24/94/9124949c76f4ae241c2595aebf4fc86c.jpg",
      title: "Amazing title",
    },
    {
      id: 7,
      img: "https://i.pinimg.com/236x/ae/b0/2f/aeb02fe5d0f294114aab9a0d5a05ec56.jpg",
      title: "Amazing title",
    },
    {
      id: 8,
      img: "https://i.pinimg.com/236x/2b/cf/ce/2bcfce0099627ec0833383ddc6d635df.jpg",
      title: "Amazing title",
    },
    {
      id: 9,
      img: "https://i.pinimg.com/236x/ae/b0/2f/aeb02fe5d0f294114aab9a0d5a05ec56.jpg",
      title: "Amazing title",
    },
    {
      id: 10,
      img: "https://i.pinimg.com/236x/c3/7c/b6/c37cb60a25cc9e1713f1010ebd22fe24.jpg",
      title: "Amazing title",
    },
  ];

  return (
    <div className="root">
      <Layout cards={cards} />
    </div>
  );
}
