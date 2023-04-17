import { Alert, AlertIcon } from "@chakra-ui/react";

export default function NoFavoritesHint() {
    return (
        <Alert status="info" mt="1rem">
            <AlertIcon />
            You don't have any favorite places. Try adding some!
        </Alert>
    );
}
