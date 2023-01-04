import { ScrollArea, Table, Menu, ActionIcon } from "@mantine/core";
import { AppContainer } from "../../components/app-container";
import { AuthenticatedView } from "../../components/authenticatedv-view";
import { OverlayBlur } from "../../components/overlay-loading";
import { formatCurrency, formatNumber } from "../../utils/formatter";
import { trpc } from "../../utils/trpc";
import { SlOptionsVertical } from "react-icons/sl";
import { RiExternalLinkLine, RiPencilLine } from "react-icons/ri";

const Option = ({ id }: { id: number }) => {
  return (
    <Menu width={200}>
      <Menu.Target>
        <ActionIcon>
          <SlOptionsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item icon={<RiExternalLinkLine size={16} />}>View</Menu.Item>
        <Menu.Item icon={<RiPencilLine size={16} />}>Edit</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

const ListPurchase = () => {
  const { isLoading, data } = trpc.purchase.list.useQuery();

  if (isLoading) return <OverlayBlur isLoading />;

  if (!data || data.length === 0) return <div>No data available</div>;

  return (
    <AuthenticatedView>
      <AppContainer>
        <ScrollArea>
          <Table verticalSpacing="md">
            <thead>
              <tr>
                <th>SI No</th>
                <th>Description</th>
                <th>count</th>
                <th>total cost</th>
                <th>supplier name</th>
                <th>supplier Address</th>
                <th>invoice number</th>
                <th>options</th>
              </tr>
            </thead>
            <tbody>
              {data.map((v) => {
                return (
                  <tr key={v.id}>
                    <td>{v.id}</td>
                    <td>{v.description}</td>
                    <td>{formatNumber(v.numbersReceived)}</td>
                    <td>{formatCurrency(v.totalCost)}</td>
                    <td>{v.supplierName}</td>
                    <td>{v.supplierAddress}</td>
                    <td>{v.invoiceNumber}</td>
                    <td>
                      <Option id={v.id} />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </ScrollArea>
      </AppContainer>
    </AuthenticatedView>
  );
};

export default ListPurchase;
