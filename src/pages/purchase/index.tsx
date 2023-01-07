import { ScrollArea } from "@mantine/core";
import { AppContainer } from "../../components/app-container";
import { AuthenticatedView } from "../../components/authenticatedv-view";
import { OverlayBlur } from "../../components/overlay-loading";
import { trpc } from "../../utils/trpc";
import { PurchaseTable } from "../../components/purchase/table";

const ListPurchase = () => {
  const { isLoading, data } = trpc.purchase.list.useQuery();

  if (isLoading) return <OverlayBlur isLoading />;

  if (!data || data.length === 0) return <div>No data available</div>;

  return (
    <AuthenticatedView>
      <AppContainer>
        <ScrollArea>
          <PurchaseTable nothingMessage="No purchases found" purchase={data} />
        </ScrollArea>
      </AppContainer>
    </AuthenticatedView>
  );
};

export default ListPurchase;
