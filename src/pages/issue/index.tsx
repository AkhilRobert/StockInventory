import { trpc } from "../../utils/trpc";
import { IssuesTable } from "../../components/issues/table";
import { AuthenticatedView } from "../../components/authenticatedv-view";
import { AppContainer } from "../../components/app-container";

const ListIssue = () => {
  const { isLoading, data } = trpc.issue.list.useQuery();

  if (isLoading || !data)
    return (
      <div>
        <h1>loading</h1>
      </div>
    );

  return (
    <AuthenticatedView>
      <AppContainer>
        <IssuesTable issues={data} />
      </AppContainer>
    </AuthenticatedView>
  );
};

export default ListIssue;
