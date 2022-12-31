import { trpc } from "../../utils/trpc";

const ListPurchase = () => {
  const { isLoading, data } = trpc.purchase.list.useQuery();

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
          <p>
            <span style={{ fontWeight: "bold" }}>id: </span>
            {v.id}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>receiptDate:</span>{" "}
            {v.receiptDate}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>description:</span>{" "}
            {v.description}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>numbersReceived:</span>{" "}
            {v.numbersReceived}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>rate:</span> {v.rate}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>totalCost:</span> {v.totalCost}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>supplier:</span> {v.supplier}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>warrantyPeriod:</span>{" "}
            {v.warrantyPeriod}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>hodAuthorized:</span>{" "}
            {String(v.hodAuthorized)}
          </p>
          <p>
            <span style={{ fontWeight: "bold" }}>
              superintendentAuthorized:
            </span>{" "}
            {String(v.superintendentAuthorized)}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ListPurchase;
