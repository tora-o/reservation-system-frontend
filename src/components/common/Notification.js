"use client";

import { ActionIcon, Menu } from "@mantine/core";
import { IconBell, IconBellRinging } from "@tabler/icons-react";
import { useSession } from "next-auth/react";
import { fetchData } from "@utils/http";
import { useEffect, useState } from "react";

export default function Notification() {
    const { data: session } = useSession();
    const [open, setOpen] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!session) return;

        const abortController = new AbortController();

        const fetchNotifications = async () => {
            const data = await fetchData(
                `${process.env.API_URL || `http://127.0.0.1:8000`}/api/profile/notifications`,
                {},
                session
            );

            setNotifications(data.data);
        }

        if (open) fetchNotifications();

        return () => abortController.abort();
    }, [session, open]);

    return (
        <Menu
            shadow="md"
            opened={open}
            onOpen={() => setOpen(true)}
            onClose={() => setOpen(false)}
            position="bottom-end"
            width={300}
        >
            <Menu.Target>
                <ActionIcon size="lg" variant="default">
                    {/* <IconBell stroke={1}/> */}
                    <IconBellRinging stroke={1} />
                </ActionIcon>
            </Menu.Target>
            <Menu.Dropdown>
                {notifications.map((notification) => (
                    <Menu.Item key={notification.id}>
                        {notification.message}
                    </Menu.Item>
                ))}
            </Menu.Dropdown>
        </Menu>
    );
}