import {
  Box,
  Button,
  Center,
  Drawer,
  Flex,
  Loader,
  Stack,
  Text,
  TextInput,
  Title,
} from "@mantine/core";
import { useRouter } from "next/router";
import { AppContainer } from "../../components/app-container";
import { AuthenticatedView } from "../../components/authenticatedv-view";
import { HistoryTable } from "../../components/issues/history-table";
import { OverlayBlur } from "../../components/overlay-loading";
import { trpc } from "../../utils/trpc";
import { AiOutlinePlus } from "react-icons/ai";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { historyCreateValidtor } from "../../validators/history-validtor";
import { zodResolver } from "@hookform/resolvers/zod";
import { Role } from "@prisma/client";

type InputType = z.infer<typeof historyCreateValidtor>;

const PurchaseID = () => {
  const router = useRouter();
  const [opened, setOpened] = useState<boolean>(false);
  const issueID = parseInt((router.query as any).id, 10);
  const { isLoading, data } = trpc.issue.getByID.useQuery(
    {
      id: issueID,
    },
    {
      enabled: !!router.query.id,
    }
  );

  const { data: meData } = trpc.auth.me.useQuery();

  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm<InputType>({
    resolver: zodResolver(historyCreateValidtor),
  });

  const {
    isLoading: historyLoading,
    data: historyData,
    refetch,
  } = trpc.history.getForIssue.useQuery(
    { id: issueID },
    {
      enabled: !isLoading,
    }
  );

  const { mutate } = trpc.history.create.useMutation();

  const onSubmit = (values: InputType) => {
    mutate(values, {
      onSuccess: () => {
        refetch();
        reset();
        setOpened(false);
      },
    });
  };

  if (isLoading || !data) {
    return <OverlayBlur isLoading />;
  }

  return (
    <AuthenticatedView>
      <AppContainer>
        <>
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
            <Flex align="center" justify="flex-end">
              <Title sx={{ flexGrow: 1 }}>History</Title>
              {meData?.role !== Role.STAFF && (
                <Box>
                  <Button
                    onClick={() => setOpened(true)}
                    leftIcon={<AiOutlinePlus />}
                    disabled={!data.Purchase.hodAuthorized}
                  >
                    Add
                  </Button>
                </Box>
              )}
            </Flex>
            {historyLoading || !historyData ? (
              <Center mih="100%">
                <Loader />
              </Center>
            ) : (
              <HistoryTable history={historyData} />
            )}
          </Stack>
          <Drawer
            position="right"
            onClose={() => setOpened(false)}
            opened={opened}
            size="xl"
            padding="md"
          >
            <Title>Add History</Title>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack mt={20} spacing="md">
                <input
                  type="hidden"
                  {...register("issueId", {
                    valueAsNumber: true,
                  })}
                  value={issueID}
                />
                <TextInput
                  label="Name"
                  error={errors.name?.message}
                  withAsterisk
                  {...register("name")}
                />

                <TextInput
                  label="Floor"
                  error={errors.floor?.message}
                  withAsterisk
                  {...register("floor")}
                />

                <Button type="submit">Add</Button>
              </Stack>
            </form>
          </Drawer>
        </>
      </AppContainer>
    </AuthenticatedView>
  );
};

export default PurchaseID;
