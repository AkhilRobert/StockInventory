import { trpc } from "../../utils/trpc";

const ListPurchase = () => {
  const { isLoading, data, refetch } = trpc.purchase.list.useQuery();

  const superintendentAuthorizeMutation =
    trpc.purchase.superintendentAuthorize.useMutation({
      onSuccess: () => {
        refetch();
      },
    });

  const hodAuthorizeMutation = trpc.purchase.HODAuthorize.useMutation({
    onSuccess: () => {
      refetch();
    },
  });

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
          <div>
            <p>
              <span style={{ fontWeight: "bold" }}>id: </span>
              {v.id}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>receiptDate:</span>{" "}
              {String(v.receiptDate)}
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
              <span style={{ fontWeight: "bold" }}>totalCost:</span>{" "}
              {v.totalCost}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>totalCost:</span>{" "}
              {v.totalCost}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>tax Percentage:</span>{" "}
              {v.totalCost}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>supplier:</span> {v.supplier}
            </p>
            <p>
              <span style={{ fontWeight: "bold" }}>Invoice number:</span>{" "}
              {v.supplier}
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

            <button
              disabled={v.superintendentAuthorized}
              onClick={() =>
                superintendentAuthorizeMutation.mutate({
                  id: v.id,
                })
              }
            >
              Superintendent Authorize
            </button>

            <button
              disabled={v.hodAuthorized}
              onClick={() =>
                hodAuthorizeMutation.mutate({
                  id: v.id,
                })
              }
            >
              HOD Authorize
            </button>
          </div>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ListPurchase;
