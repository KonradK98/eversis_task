import { PlaceTableRowProps } from "@/components/PlaceTableRow";

export function mean(a: string, b: string) {
    const value: number = (parseFloat(a) + parseFloat(b)) / 2
    return value.toString()
}

export function getFavoritesArray() : PlaceTableRowProps[] {
  let storageVal = localStorage.getItem('favorites')
  let favorites : PlaceTableRowProps[] = []
  if(storageVal){
    favorites = JSON.parse(storageVal)
  }
  return favorites
}