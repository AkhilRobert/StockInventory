import { trpc } from "../../utils/trpc";
import Link from "next/link";

const ListIssue = () => {
  const { isLoading, data } = trpc.issue.list.useQuery();

  if (isLoading || !data)
    return (
      <div>
        <h1>loading</h1>
      </div>
    );

  return (
    <div>
      {data.map((v) => (
        <div key={v.id}>
          <h1>{v.uniqueId}</h1>
          <p>purchase id: {v.purchaseId}</p>
          <p>purchase description: {v.Purchase.description ?? ""}</p>
          <Link href={`history/${v.id}`}>Add Transfer</Link>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListIssue;
