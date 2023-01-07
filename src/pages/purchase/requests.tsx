import { Center, Text } from "@mantine/core";
import { Role } from "@prisma/client";
import { AppContainer } from "../../components/app-container";
import { AuthenticatedView } from "../../components/authenticatedv-view";
import { PurchaseTable } from "../../components/purchase/table";
import { trpc } from "../../utils/trpc";

const PurchaseRequest = () => {
  const { data, isLoading } = trpc.auth.me.useQuery();

  const { data: superintendentData } =
    trpc.purchase.getSuperintendentRequest.useQuery(undefined, {
      enabled: !isLoading && data?.role === Role.SUPERINTENDENT,
    });

  const { data: hodData } = trpc.purchase.getHODRequests.useQuery(undefined, {
    enabled: !isLoading && data?.role === Role.HOD,
  });

  if (data?.role === Role.SUPERINTENDENT) {
    return (
      <AuthenticatedView>
        <AppContainer>
          {!superintendentData ? (
            <Center>
              <Text color="red" fz="xl">
                Something went wrong please refresh the website
              </Text>
            </Center>
          ) : (
            <PurchaseTable
              nothingMessage="No requests found"
              purchase={superintendentData}
            />
          )}
        </AppContainer>
      </AuthenticatedView>
    );
  }

  if (data?.role === Role.HOD) {
    return (
      <AuthenticatedView>
        <AppContainer>
          {!hodData ? (
            <Text color="red" fz="xl">
              Something went wrong please refresh the website
            </Text>
          ) : (
            <PurchaseTable
              nothingMessage="No requests found"
              purchase={hodData}
            />
          )}
        </AppContainer>
      </AuthenticatedView>
    );
  }

  return (
    <AuthenticatedView>
      <AppContainer>
        <Text color="red" fz="xl">
          Something went wrong please refresh the website
        </Text>
      </AppContainer>
    </AuthenticatedView>
  );
};

export default PurchaseRequest;
