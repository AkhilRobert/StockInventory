import { Center, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { AppContainer } from "../../components/app-container";
import { AuthenticatedView } from "../../components/authenticatedv-view";
import { HistoryList } from "../../components/issues/history";
import { OverlayBlur } from "../../components/overlay-loading";
import { trpc } from "../../utils/trpc";

const PurchaseID = () => {
  const router = useRouter();
  const purchaseID = parseInt((router.query as any).id, 10);
  const { isLoading, data } = trpc.issue.getByID.useQuery(
    {
      id: purchaseID,
    },
    {
      enabled: !!router.query.id,
    }
  );

  const { isLoading: historyLoading, data: historyData } =
    trpc.history.getForIssue.useQuery(
      { id: purchaseID },
      {
        enabled: !isLoading,
      }
    );

  if (isLoading || !data) {
    return <OverlayBlur isLoading />;
  }

  return (
    <AuthenticatedView>
      <AppContainer>
        <Title mb={10}>Details</Title>
        <Stack>
          <Flex>
            <Text fw={500}>SI NO : </Text>
            <Text>{data.purchaseId}</Text>
          </Flex>
          <Flex>
            <Text fw={500}>Description : </Text>
            <Text>{data.Purchase.description}</Text>
          </Flex>
          <Flex>
            <Text fw={500}>Numbers Received : </Text>
            <Text>{data.Purchase.numbersReceived}</Text>
          </Flex>
          <Flex>
            <Text fw={500}>Condatimated : </Text>
            <Text>{data.condaminated ? "Yes" : "No"}</Text>
          </Flex>
        </Stack>
        <Stack mih="100%" mt="md">
          <Title>History</Title>
          {historyLoading || !historyData ? (
            <Center mih="100%">
              <Loader />
            </Center>
          ) : (
            <HistoryList history={historyData} />
          )}
        </Stack>
      </AppContainer>
    </AuthenticatedView>
  );
};

export default PurchaseID;
