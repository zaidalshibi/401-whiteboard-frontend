import { Heading, useColorMode, VStack } from "@chakra-ui/react";
import React from "react";

function Comments ( props ) {
    const { colorMode } = useColorMode();
    return (
        <>
            <VStack
                w="60vw"
                p={4}
                rounded="md"
                shadow="md"
                bg={colorMode === "light" ? "purple.200" : "purple.800"}
                key={props.idx}
            >
                <Heading as='h3' size='lg'>{props.comment.user.username}: {props.comment.content}</Heading>
            </VStack>
        </>
    );
}
export default Comments;