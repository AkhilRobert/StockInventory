import { Center, Table, Text } from "@mantine/core";
import type { History } from "@prisma/client";

type Props = {
  history: History[];
};

export const HistoryTable = ({ history }: Props) => {
  if (history.length === 0)
    return (
      <Center>
        <Text>No History Found</Text>
      </Center>
    );

  return (
    <Table verticalSpacing="md">
      <thead>
        <tr>
          <th>SI No</th>
          <th>Name</th>
          <th>Floor</th>
        </tr>
      </thead>
      <tbody>
        {history.map((v, i) => (
          <tr key={v.id}>
            <td>{i + 1}</td>
            <td>{v.name}</td>
            <td>{v.floor}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};
