import { Button, Flex, Loader, Stack, Text, Title } from "@mantine/core";
import { useRouter } from "next/router";
import { AppContainer } from "../../components/app-container";
import { AuthenticatedView } from "../../components/authenticatedv-view";
import { OverlayBlur } from "../../components/overlay-loading";
import { formatCurrency, formatNumber } from "../../utils/formatter";
import { trpc } from "../../utils/trpc";
import { BsCheckCircle } from "react-icons/bs";
import { MdOutlineError } from "react-icons/md";
import dayjs from "dayjs";
import { getRemainingDays } from "../../utils/formatter";
import { IssuesTable } from "../../components/issues/table";
import { Role } from "@prisma/client";
import Link from "next/link";

const PurchaseID = () => {
  const router = useRouter();
  const purchaseID = parseInt((router.query as any).id, 10);
  const { isLoading, data, refetch } = trpc.purchase.getByID.useQuery(
    {
      id: purchaseID,
    },
    {
      enabled: !!router.query.id,
    }
  );

  const { isLoading: issueLoading, data: issueData } =
    trpc.issue.getForPurchase.useQuery(
      { id: purchaseID },
      {
        enabled: !isLoading,
      }
    );

  const { data: meData } = trpc.auth.me.useQuery();

  const { mutate: superintendentMutate, isLoading: superintendentAuthorizing } =
    trpc.purchase.superintendentAuthorize.useMutation();

  const { mutate: hodMutate, isLoading: hodAuthorizing } =
    trpc.purchase.HODAuthorize.useMutation();

  if (isLoading || !data) {
    return <OverlayBlur isLoading />;
  }

  return (
    <AuthenticatedView>
      <AppContainer>
        <Title mb={10}>Details</Title>
        <Flex
          sx={{
            "& > *": {
              width: "100%",
            },
          }}
        >
          <Stack>
            <Flex>
              <Text fw={500}>ID : </Text>
              <Text>{data.id}</Text>
            </Flex>
            <Flex gap="xs">
              <Text fw={500}>Description : </Text>
              <Text>{data.description}</Text>
            </Flex>{" "}
            <Flex gap="xs">
              <Text fw={500}>Numbers Received : </Text>
              <Text>{formatNumber(data.numbersReceived)}</Text>
            </Flex>
            <Flex gap="xs">
              <Text fw={500}>Rate : </Text>
              <Text>{formatCurrency(data.rate)}</Text>
            </Flex>
            <Flex gap="xs">
              <Text fw={500}>Tax Type : </Text>
              <Text>{data.taxType}</Text>
            </Flex>
            <Flex gap="xs">
              <Text fw={500}>Tax Percentage : </Text>
              <Text>{data.taxPercentage}%</Text>
            </Flex>
            <Flex gap="xs">
              <Text fw={500}>Supplier : </Text>
              <Text>{data.supplierName}</Text>
            </Flex>
            <Flex gap="xs">
              <Text fw={500}>Supplier Address : </Text>
              <Text>{data.supplierAddress}</Text>
            </Flex>
            <Flex gap="xs">
              <Text fw={500}>Invoice Number : </Text>
              <Text>{data.invoiceNumber}</Text>
            </Flex>
            <Flex gap="xs">
              <Text fw={500}>Warranty Period : </Text>
              <Flex gap="xs">
                <Text>
                  {dayjs(data.warrantyPeriod.toDateString()).format("D-M-YYYY")}
                </Text>
                <Text>
                  ({getRemainingDays(new Date(Date.now()), data.warrantyPeriod)}
                  )
                </Text>
              </Flex>
            </Flex>
            <Flex gap="xs">
              <Text fw={500}>HOD Authorized : </Text>
              <Text>
                {data.hodAuthorized ? (
                  <Flex align="center" gap="xs">
                    <BsCheckCircle color="green" />
                    <Text>Authorized</Text>
                  </Flex>
                ) : (
                  <Flex align="center" gap="xs">
                    <MdOutlineError color="red" />
                    <Text color="red">Not Authorized</Text>
                  </Flex>
                )}
              </Text>
            </Flex>
            <Flex gap="xs">
              <Text fw={500}>Superintendent Authorized : </Text>
              <Text>
                {data.superintendentAuthorized ? (
                  <Flex align="center" gap="xs">
                    <BsCheckCircle color="green" />
                    <Text>Authorized</Text>
                  </Flex>
                ) : (
                  <Flex align="center" gap="xs">
                    <MdOutlineError color="red" />
                    <Text color="red">Not Authorized</Text>
                  </Flex>
                )}
              </Text>
            </Flex>
          </Stack>

          <Stack align="flex-end" justify="flex-end">
            {meData?.role !== Role.STAFF && (
              <Button
                component={Link}
                href={`/purchase/edit/${data.id}`}
                w="300px"
              >
                Edit
              </Button>
            )}

            {meData?.role === Role.SUPERINTENDENT && (
              <Button
                onClick={() => {
                  superintendentMutate(
                    {
                      id: purchaseID,
                    },
                    {
                      onSuccess: () => {
                        refetch();
                      },
                    }
                  );
                }}
                loading={superintendentAuthorizing}
                disabled={data.superintendentAuthorized}
                w="300px"
              >
                Authorize
              </Button>
            )}

            {meData?.role === Role.HOD && (
              <Button
                onClick={() => {
                  hodMutate(
                    {
                      id: purchaseID,
                    },
                    {
                      onSuccess: () => {
                        refetch();
                      },
                    }
                  );
                }}
                loading={hodAuthorizing}
                disabled={data.hodAuthorized}
                w="300px"
              >
                Authorize
              </Button>
            )}
          </Stack>
        </Flex>

        <Stack mt="md">
          <Title>Issues</Title>
          {issueLoading ? (
            <Loader />
          ) : (
            issueData && <IssuesTable issues={issueData} />
          )}
        </Stack>
      </AppContainer>
    </AuthenticatedView>
  );
};

export default PurchaseID;
