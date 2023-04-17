import { getFavoritesArray } from "@/utils/helperFunctions";
import { ExternalLinkIcon, ViewIcon, StarIcon } from "@chakra-ui/icons";
import { Tr, Td, Flex, IconButton } from "@chakra-ui/react";
import router from "next/router";
import { useState } from "react";

export interface PlaceTableRowProps {
  icon: string;
  place_id: string;
  display_name: string;
  latitude: string;
  longitude: string;
}

export default function PlaceTableRow({
  icon,
  place_id,
  display_name,
  latitude,
  longitude,
}: PlaceTableRowProps) {

  const [rerender, setRerender] = useState(false)

  const showDetails = (place_id: string) => {
    router.push({
      pathname: "/" + place_id,
    });
  };

  const showOnMap = (name: string, lon: string, lat: string) => {
    window.open(
      `https://www.openstreetmap.org/search?query=${name}#map=18/${lon}/${lat}`
    );
  };

  function toggleFavorites(place_id: string) {
    let favorites : PlaceTableRowProps[] = getFavoritesArray()

    let index = favorites.findIndex(element => element.place_id === place_id)
    if (index === -1) {
      favorites.push({
          icon,
          place_id,
          display_name,
          latitude,
          longitude,    
      })
    }else{
      favorites.splice(index, 1)
    }
    localStorage.setItem('favorites', JSON.stringify(favorites))
    setRerender(!rerender)
  }

  function isFavorite(place_id :string) : boolean{
    let favorites : PlaceTableRowProps[] = getFavoritesArray()
    return favorites.some(element => element.place_id === place_id)
  }

  return (
    <Tr>
      <Td textAlign="center" width="70px">
        <img src={icon} />
      </Td>
      <Td>{place_id}</Td>
      <Td>
        <p>{display_name}</p>
        <p>
          <small>
            Coordinates: {latitude}, {longitude}
          </small>
        </p>
      </Td>
      <Td>
        <Flex key={rerender} gap="10px">
          <IconButton
            colorScheme="facebook"
            aria-label="Show on map"
            icon={<ExternalLinkIcon />}
            onClick={() => showOnMap(display_name, latitude, longitude)}
          />
          <IconButton
            colorScheme="blue"
            aria-label="Show details"
            icon={<ViewIcon />}
            onClick={() => showDetails(place_id)}
          />
          <IconButton
            colorScheme={isFavorite(place_id) ? "green" : "yellow"}
            aria-label="Add to bookmarks"
            icon={<StarIcon />}
            onClick={() => toggleFavorites(place_id)}
          />
        </Flex>
      </Td>
    </Tr>
  );
}
