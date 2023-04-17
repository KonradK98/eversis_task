import { Tr, Td } from "@chakra-ui/react";

interface DeetailsTableRowProps {
  property: string;
  placeDetails: any;
}
export default function DetailsTableRow({
  property,
  placeDetails,
}: DeetailsTableRowProps) {
  const parseValue = (value: any) => {
    let valueParsed: string = "";
    switch (typeof value) {
      case "string":
        valueParsed = value;
        break;

      case "number":
        valueParsed = value + "";
        break;

      case "object":
        if (Array.isArray(value)) {
          if (value.length === 1) {
            const object = value[0];
            for (const key in object) {
              valueParsed += `${key.toString()}: ${object[key]} \n`;
            }
          } else {
            valueParsed = value.join(", ");
          }
        } else {
          for (const key in value) {
            valueParsed += `${key.toString()}: ${value[key]} \n`;
          }
        }
        break;

      default:
        valueParsed = "-";
        break;
    }
    return valueParsed;
  };

  return (
    <Tr>
      <Td>{property}</Td>
      <Td>{parseValue(placeDetails[property])}</Td>
    </Tr>
  );
}
