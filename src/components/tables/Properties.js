"use client";

import { useDisclosure } from "@mantine/hooks";
import { Modal, Table, Group, Text, ActionIcon, rem } from "@mantine/core";
import { IconPencil, IconTrash } from "@tabler/icons-react";

const Property = ({ item }) => {
    const { name, price, id } = item;
    const [opened, { open, close }] = useDisclosure(false);
    const handleDelete = (id) => {
        console.log(id);
    };

    return (
        <>
            <Table.Tr>
                <Table.Td>
                    <Text fz="sm">{name}</Text>
                </Table.Td>
                <Table.Td>
                    <Text fz="sm">{name}</Text>
                </Table.Td>
                <Table.Td>
                    <Text fz="sm">${price.toFixed(2)} / night</Text>
                </Table.Td>
                <Table.Td>
                    <Group gap={0} justify="flex-end">
                        <ActionIcon variant="subtle" color="gray">
                            <IconPencil
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                                onClick={open}
                            />
                        </ActionIcon>
                        <ActionIcon
                            variant="subtle"
                            color="red"
                            onClick={() => handleDelete(id)}
                        >
                            <IconTrash
                                style={{ width: rem(16), height: rem(16) }}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Group>
                </Table.Td>
            </Table.Tr>
            <Modal
                opened={opened}
                onClose={close}
                title={name}
                centered
            ></Modal>
        </>
    );
};

export default function Properties({ data }) {
    const rows = data.map((item) => <Property key={item.id} item={item} />);

    return (
        <Table.ScrollContainer minWidth="100%">
            <Table verticalSpacing="md" highlightOnHover>
                <Table.Tr>
                    <Table.Th>Property Name</Table.Th>
                    <Table.Th>Description</Table.Th>
                    <Table.Th>Price</Table.Th>
                    <Table.Th />
                </Table.Tr>
                <Table.Tbody>{rows}</Table.Tbody>
            </Table>
        </Table.ScrollContainer>
    );
}