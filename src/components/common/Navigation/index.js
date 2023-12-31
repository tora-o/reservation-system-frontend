"use client";

import cx from "clsx";
import { useState } from "react";
import {
    Container,
    Image,
    Drawer,
    Avatar,
    UnstyledButton,
    Group,
    Text,
    Menu,
    Tabs,
    Burger,
    ScrollArea,
    Divider,
    rem,
} from "@mantine/core";
import { useDisclosure, upperFirst } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons-react";
import {
    ColorSchemeToggle,
    Notification,
    ProfileCard,
} from "@src/components/common";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import classes from "./Navigation.module.css";

const tabs = ["home"];
const adminTabs = ["properties", "tenants", "payments"];

const UserMenu = () => {
    const { data: session } = useSession();
    const [userMenuOpened, setUserMenuOpened] = useState(false);

    return (
        <Menu
            width={260}
            position="bottom-end"
            transitionProps={{ transition: "pop-top-right" }}
            onClose={() => setUserMenuOpened(false)}
            onOpen={() => setUserMenuOpened(true)}
            withinPortal
            zIndex={1000000}
        >
            <Menu.Target>
                <UnstyledButton
                    className={cx(classes.user, {
                        [classes.userActive]: userMenuOpened,
                    })}
                >
                    <Group gap={7}>
                        <Avatar radius="xl" size={20} />
                        <Text fw={500} size="sm" lh={1} mr={3}>
                            {`${session ? session?.user.firstName : ""} ${
                                session ? session?.user.lastName : ""
                            }`}
                        </Text>
                        <IconChevronDown
                            style={{
                                width: rem(12),
                                height: rem(12),
                            }}
                            stroke={1.5}
                        />
                    </Group>
                </UnstyledButton>
            </Menu.Target>
            <Menu.Dropdown>
                <Menu.Label>Settings</Menu.Label>
                <ProfileCard session={session} closeUserMenu={() => console.log('clicked')}/>
            </Menu.Dropdown>
        </Menu>
    );
};

const MobileMenu = ({ opened, onClose }) => {
    const { data: session } = useSession();
    const items = tabs.map((tab) => (
        <a
            href={tab === "home" ? "/" : `/${tab}`}
            className={classes.link}
            key={tab}
        >
            {upperFirst(tab)}
        </a>
    ));
    const adminItems = adminTabs.map((tab) => (
        <a href={`/${tab}`} className={classes.link} key={tab}>
            {upperFirst(tab)}
        </a>
    ));

    return (
        <Drawer
            opened={opened}
            onClose={onClose}
            size="lg"
            padding="md"
            hiddenFrom="sm"
            zIndex={1000000}
        >
            <Drawer.Header>
                <ColorSchemeToggle />
                <Notification />
            </Drawer.Header>
            <ScrollArea h={`calc(100vh - ${rem(80)})`} mx="-md" px="sm">
                <Divider my="sm" />
                {items}
                {session?.user.admin && adminItems}
                <Divider my="sm" />
                <ProfileCard session={session} />
            </ScrollArea>
        </Drawer>
    );
};

export default function Navigation() {
    const [opened, { toggle, close }] = useDisclosure(false);
    const { data: session } = useSession();
    const router = useRouter();
    const pathname = usePathname();

    const items = tabs.map((tab) => (
        <Tabs.Tab value={tab === "home" ? "/" : `/${tab}`} key={tab}>
            {upperFirst(tab)}
        </Tabs.Tab>
    ));
    const adminItems = adminTabs.map((tab) => (
        <Tabs.Tab value={`/${tab}`} key={tab}>
            {upperFirst(tab)}
        </Tabs.Tab>
    ));

    return (
        <div className={classes.header}>
            <Container className={classes.mainSection} size="md">
                <Group justify="space-between">
                    <a href="/">
                        <Image
                            alt="logo"
                            src="/logo.png"
                            style={{ width: "6rem", maxHeight: "100%" }}
                        />
                    </a>

                    <Group gap={10} className={classes.hideOnMobile}>
                        <UserMenu />
                        <ColorSchemeToggle />
                        <Notification />
                    </Group>

                    <Burger
                        opened={opened}
                        onClick={toggle}
                        hiddenFrom="xs"
                        size="sm"
                    />
                </Group>
            </Container>
            <Container size="md">
                <Tabs
                    defaultValue="Home"
                    variant="outline"
                    visibleFrom="sm"
                    classNames={{
                        root: classes.tabs,
                        list: classes.tabsList,
                        tab: classes.tab,
                    }}
                    value={pathname}
                    onChange={(value) => router.push(value)}
                >
                    <Tabs.List>
                        {items}
                        {session?.user.admin && adminItems}
                    </Tabs.List>
                </Tabs>
            </Container>
            <MobileMenu opened={opened} onClose={close} />
        </div>
    );
}
