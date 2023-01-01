import Link from "next/link";
import { useRouter } from "next/router";
import { trpc } from "../../utils/trpc";

const HistoryList = () => {
  const router = useRouter();
  const { isLoading, data } = trpc.history.list.useQuery(
    {
      id: parseInt(router.query.id as string, 10),
    },
    {
      enabled: !!router.query.id,
    }
  );

  if (isLoading)
    return (
      <div>
        <h1>loading</h1>
      </div>
    );

  if (!data || data.length === 0)
    return (
      <div>
        <Link href={`${router.query.id}/create`}>Add history</Link>
        <h1>No data found</h1>
      </div>
    );

  return (
    <div>
      <Link href={`${router.query.id}/create`}>Add history</Link>
      {data.map((v) => (
        <div key={v.id}>
          <div>
            <p>Name: {v.name}</p>
            <p>Floor: {v.floor}</p>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default HistoryList;
