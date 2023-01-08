import { trpc } from "../../utils/trpc";
import { IssuesTable } from "../../components/issues/table";
import { AuthenticatedView } from "../../components/authenticatedv-view";
import { AppContainer } from "../../components/app-container";
import { Center, Loader } from "@mantine/core";

const ListIssue = () => {
  const { isLoading, data } = trpc.issue.list.useQuery();

  return (
    <AuthenticatedView>
      <AppContainer>
        {isLoading || !data ? (
          <Center mih="100%">
            <Loader />
          </Center>
        ) : (
          <IssuesTable issues={data} />
        )}
      </AppContainer>
    </AuthenticatedView>
  );
};

export default ListIssue;
