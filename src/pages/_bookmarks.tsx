import { TableContainer, Thead, Th, Table, Tbody, Tr, Flex, Heading, Button } from "@chakra-ui/react";
import PlaceTableRow, { PlaceTableRowProps } from "@/components/PlaceTableRow";
import { getFavoritesArray } from "@/utils/helperFunctions";
import NoFavoritesHint from "@/components/NoFavoritesHint";
import router from "next/router";
import { ChevronLeftIcon } from "@chakra-ui/icons";


export default function Bookmarks() {

    const favorites: PlaceTableRowProps[] = getFavoritesArray()

    return (
        <Flex
            maxW="1000px"
            width="100%"
            height="100%"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            marginX="auto"
        >
            <Flex
                direction="column"
                justifyContent="center"
                height="auto"
                width="100%"
                marginTop="2rem"
                padding="1rem"
                backgroundColor="whiteAlpha.900"
                borderRadius="10px"
            >
                <Flex
                    direction="row"
                    justifyContent="space-between"
                    width="100%"
                >
                    <Heading as="h1" mb="4">
                        My favorite places
                    </Heading>
                    <Button rightIcon={<ChevronLeftIcon />} onClick={() => {
                        router.replace({
                            pathname: "/",
                        });
                    }}>
                        Back to search
                    </Button>
                </Flex>
                {favorites.length ?
                    <TableContainer>
                        <Table
                            whiteSpace="break-spaces"
                            variant="striped"
                            marginY="2rem"
                            display={favorites.length ? "table" : "none"}
                        >
                            <Thead>
                                <Tr>
                                    <Th>Type</Th>
                                    <Th>ID</Th>
                                    <Th>Name</Th>
                                    <Th>Actions</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {favorites.map(place => {
                                    return (
                                        <PlaceTableRow key={place.place_id}
                                            icon={place.icon}
                                            place_id={place.place_id}
                                            display_name={place.display_name}
                                            latitude={place.latitude}
                                            longitude={place.longitude} />
                                    )
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                    : <NoFavoritesHint />}
            </Flex>
        </Flex>
    )
}