import { Center } from "@mantine/core";
import { Navigation } from "@src/components/common";

export const metadata = {
    title: "Reservation System - Profile",
    description: "Reservation System - Profile",
};

export default function Layout({ children }) {
    return (
        <>
            <Navigation />
            <Center
                style={{
                    height: "100vh"
                }}
            >
                {children}
            </Center>
        </>
    );
}
