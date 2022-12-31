import { trpc } from "../utils/trpc";

const Test = () => {
  const a = trpc.auth.me.useQuery();

  return (
    <div>
      <h1>{a.data?.message}</h1>
    </div>
  );
};

export default Test;
