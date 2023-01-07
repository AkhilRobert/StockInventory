import { ActionIcon, Center, Menu, Table, Text } from "@mantine/core";
import type { Purchase } from "@prisma/client";
import Link from "next/link";
import { RiExternalLinkLine, RiPencilLine } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { formatCurrency, formatNumber } from "../../utils/formatter";

const Option = ({ id }: { id: number }) => {
  return (
    <Menu width={200}>
      <Menu.Target>
        <ActionIcon>
          <SlOptionsVertical />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item
          href={`/purchase/${id}`}
          component={Link}
          icon={<RiExternalLinkLine size={16} />}
        >
          View
        </Menu.Item>
        <Menu.Item
          component={Link}
          href={`/purchase/edit/${id}`}
          icon={<RiPencilLine size={16} />}
        >
          Edit
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

type Props = {
  purchase: Purchase[];
  nothingMessage: string;
};

export const PurchaseTable = ({ purchase, nothingMessage }: Props) => {
  if (purchase.length === 0) {
    return (
      <Center>
        <Text>{nothingMessage}</Text>
      </Center>
    );
  }

  return (
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
        {purchase.map((v) => {
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
  );
};
