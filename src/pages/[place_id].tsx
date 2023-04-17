import { GetStaticProps } from "next";
import { ParsedUrlQuery } from "querystring";
import { getPlaceDetails } from "../api/nominatimService";
import { Container, Flex, Heading } from "@chakra-ui/layout";
import NextLink from "next/link";
import { TableContainer, Table, Tbody, Th, Tr, Thead, Button } from "@chakra-ui/react";
import DetailsTableRow from "@/components/DetailsTableRow";
import router from "next/router";
import { StarIcon } from "@chakra-ui/icons";

export const getStaticPaths = async () => {
  return {
    paths: [],
    fallback: true,
  };
};

interface PlaceParams extends ParsedUrlQuery {
  place_id: string;
}

export const getStaticProps: GetStaticProps = async (context) => {
  const { params } = context;
  const { place_id } = params as PlaceParams;

  try {
    const placeDetails: any = await getPlaceDetails(place_id);
    if (placeDetails.place_id) {
      return {
        props: {
          placeDetails,
        },
      };
    } else {
      return {
        notFound: true,
        revalidate: 5,
      };
    }
  } catch (error) {
    return {
      notFound: true,
      revalidate: 5,
    };
  }
};

export default function Place({ placeDetails }: any) {
  return (
    <>
      {placeDetails && (
        <Container
          maxW="1000px"
          width="100%"
          padding="1rem"
          backgroundColor="whiteAlpha.900"
          borderRadius="10px"
          mt="2rem"
        >
          <Flex direction="column" justifyContent="center" width="100%">
            <Flex mb="1rem" justifyContent="space-between" alignItems="center">
              <Heading as="h1">{placeDetails!.localname}</Heading>
              <Flex mb="1rem" justifyContent="space-between" alignItems="center">
                <NextLink passHref={true} href={`/`} prefetch={false}>
                  &lt; Back to search
                </NextLink>
                <Button ml='1rem' rightIcon={<StarIcon />} onClick={() => {
                  router.push({
                    pathname: "/" + '_bookmarks',
                  });
                }}>
                  Favorite Places
                </Button>
              </Flex>
            </Flex>

            <TableContainer>
              <Table variant="striped" mb="2rem" whiteSpace="break-spaces">
                <Thead>
                  <Tr>
                    <Th>Key</Th>
                    <Th>Value</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {Object.keys(placeDetails).map((key) => (
                    <DetailsTableRow
                      key={key}
                      placeDetails={placeDetails}
                      property={key}
                    />
                  ))}
                </Tbody>
              </Table>
            </TableContainer>
          </Flex>
        </Container>
      )}
    </>
  );
}
