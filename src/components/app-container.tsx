import { AppShell, Navbar, Header, Text, Container } from "@mantine/core";
import { ReactNode } from "react";

export const AppContainer = ({ children }: { children: ReactNode }) => {
  return (
    <AppShell
      navbar={
        <Navbar p="md" hiddenBreakpoint="sm" style={{ width: 300 }}>
          <Text>Application navbar</Text>
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md">
          <div
            style={{ display: "flex", alignItems: "center", height: "100%" }}
          >
            <Text>Application header</Text>
          </div>
        </Header>
      }
    >
      <Container maw="100%" style={{ marginLeft: 300 }}>
        {children}
      </Container>
    </AppShell>
  );
};
