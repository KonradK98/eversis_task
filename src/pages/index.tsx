import { useRef, useContext, useState } from "react";
import { IconButton } from "@chakra-ui/button";
import { Input } from "@chakra-ui/input";
import { Flex, Heading } from "@chakra-ui/layout";
import { SearchIcon, CloseIcon, StarIcon } from "@chakra-ui/icons";
import { findPlaces } from "@/api/nominatimService";
import { AppContext } from "@/context/appContext";
import { TableContainer, Thead, Th, Table, Tbody, Tr, Button } from "@chakra-ui/react";
import NoResultsAlert from "@/components/NoResultsAlert";
import SearchHint from "@/components/SearchHint";
import PlaceTableRow from "@/components/PlaceTableRow";
import router from "next/router";
import { mean } from "@/utils/helperFunctions";

export default function Home() {
  const appContext = useContext(AppContext);
  const searchInput = useRef<null | HTMLInputElement>(null);
  const { phrase, setPhrase, placesList, setPlacesList } = appContext;

  const [searchConducted, setSearchConducted] = useState(false)

  function noResults() {
    return searchConducted && phrase !== '' && !placesList.length
  }

  function clear() {
    setSearchConducted(false)
    setPhrase('')
    setPlacesList([])
  }

  function search() {
    findPlaces(phrase).then(r => {
      setPlacesList(r)
      setSearchConducted(true)
    })
  }


  return (
    <Flex
      maxW="1000px"
      width="100%"
      height="100%"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      marginX="auto"
      display={placesList.length && !noResults() ? "block" : "flex"}
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
            I want to visit...
          </Heading>
          <Button rightIcon={<StarIcon />} onClick={() => {
            router.push({
              pathname: "/" + '_bookmarks',
            });
          }}>
            Favorite Places
          </Button>
        </Flex>


        <Flex gap="10px">
          <Input
            ref={(el) => (searchInput.current = el)}
            value={phrase}
            placeholder="Search places"
            onChange={(event) => {
              setSearchConducted(false)
              setPhrase(event.currentTarget.value)
            }}
            onKeyUp={(event) => {
              if (event.key === "Enter") {
                search();
              }
            }}
          />
          <IconButton
            aria-label="Clear results"
            icon={<CloseIcon />}
            onClick={() => clear()}
          />
          <IconButton
            aria-label="Search database"
            icon={<SearchIcon />}
            onClick={() => search()}
          />
        </Flex>
        {noResults() && <NoResultsAlert phrase={phrase} />}
        {!noResults() && !placesList.length && <SearchHint />}
        {!noResults() && (
          <TableContainer>
            <Table
              whiteSpace="break-spaces"
              variant="striped"
              marginY="2rem"
              display={placesList.length ? "table" : "none"}
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
                {placesList.map(place => {
                  return (
                    <PlaceTableRow key={place.place_id}
                      icon={place.icon}
                      place_id={place.place_id}
                      display_name={place.display_name}
                      latitude={mean(place.boundingbox[0], place.boundingbox[1])}
                      longitude={mean(place.boundingbox[2], place.boundingbox[3])} />
                  )
                })}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Flex>
    </Flex>
  );
}
