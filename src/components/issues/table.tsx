import { ActionIcon, Menu, Table } from "@mantine/core";
import type { Issue } from "@prisma/client";
import Link from "next/link";
import { RiExternalLinkLine, RiPencilLine } from "react-icons/ri";
import { SlOptionsVertical } from "react-icons/sl";
import { MdOutlineDone, MdOutlineHighlightOff } from "react-icons/md";

type Props = {
  issues: Issue[];
};

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
          href={`/issue/${id}`}
          component={Link}
          icon={<RiExternalLinkLine size={16} />}
        >
          View
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export const IssuesTable = ({ issues }: Props) => {
  return (
    <div>
      <Table verticalSpacing="md">
        <thead>
          <tr>
            <th>SI No</th>
            <th>Issue ID</th>
            <th>Alive</th>
            <th>Option</th>
          </tr>
        </thead>
        <tbody>
          {issues.map((v) => {
            return (
              <tr key={`${v.id}-${v.uniqueId}`}>
                <td>{v.id}</td>
                <td>{v.uniqueId}</td>
                <td>
                  {v.condaminated ? (
                    <MdOutlineHighlightOff size={16} color="red" />
                  ) : (
                    <MdOutlineDone size={16} color="green" />
                  )}
                </td>
                <td>
                  <Option id={v.id} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </div>
  );
};
