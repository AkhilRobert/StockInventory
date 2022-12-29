import { trpc } from "../utils/trpc";

const Home = () => {
  const { isLoading, data } = trpc.hello.useQuery({ text: "Master" });

  /* if (isLoading || !data) return <div>Loading</div>; */
  if (isLoading || !data) return <div>Loading</div>;

  return (
    <div>
      <h1>{data.greeting}</h1>
    </div>
  );
};

export default Home;
