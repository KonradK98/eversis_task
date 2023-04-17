import { Alert, AlertIcon } from "@chakra-ui/react";

interface AlertProps {
  phrase: string;
}

export default function NoResultsAlert({ phrase }: AlertProps) {
  return (
    <Alert status="warning" mt="1rem">
      <AlertIcon />
      Sorry, no results found for phrase: &quot;{phrase}&quot;
    </Alert>
  );
}
