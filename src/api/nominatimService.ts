const findPlaces = async (phrase: string) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/search?q=${phrase}&format=json&dedupe=0&limit=20`)
  const data = await response.json()
  return data
};

const getPlaceDetails = async (place_id: string) => {
  const response = await fetch(`https://nominatim.openstreetmap.org/details?place_id=${place_id}&format=json`)
  const data = await response.json()
  return data
};

export { findPlaces, getPlaceDetails };
