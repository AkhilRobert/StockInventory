import {
  AppShell,
  Navbar,
  Header,
  Text,
  Container,
  Accordion,
  Stack,
  Button,
  Avatar,
  Flex,
} from "@mantine/core";
import { Role } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import { trpc } from "../utils/trpc";
import { useQueryClient } from "@tanstack/react-query";

export const AppContainer = ({ children }: { children: ReactNode }) => {
  const { data } = trpc.auth.me.useQuery();
  const { mutate, isLoading } = trpc.auth.logout.useMutation();
  const router = useRouter();
  const client = useQueryClient();

  return (
    <AppShell
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" style={{ width: 300 }}>
          <Navbar.Section grow>
            <Accordion>
              <Accordion.Item value="purchase">
                <Accordion.Control>Purchase</Accordion.Control>
                <Accordion.Panel>
                  <Stack ml="md">
                    <Link href="/purchase">List</Link>
                    <Link href="/purchase/create">Create</Link>
                    {data?.role !== Role.STAFF && (
                      <Link href="/purchase/requests">Requests</Link>
                    )}
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>

              <Accordion.Item value="issue">
                <Accordion.Control>Issue</Accordion.Control>
                <Accordion.Panel>
                  <Stack ml="md">
                    <Link href="/issue">List</Link>
                  </Stack>
                </Accordion.Panel>
              </Accordion.Item>
            </Accordion>
          </Navbar.Section>

          <Navbar.Section>
            <Button
              onClick={() => {
                mutate(undefined, {
                  onSuccess: () => {
                    client.clear();
                  },
                });
                router.replace("/");
              }}
              miw="100%"
              size="md"
              variant="light"
              color="red"
              loading={isLoading}
            >
              Logout
            </Button>
          </Navbar.Section>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <Flex justify="flex-end">
            <Flex align="center" gap="xs">
              <Avatar color="blue" radius="xl" />
              <Text>{data?.username}</Text>
            </Flex>
          </Flex>
        </Header>
      }
    >
      <Container maw="100%" style={{ marginLeft: 300 }}>
        {children}
      </Container>
    </AppShell>
  );
};
