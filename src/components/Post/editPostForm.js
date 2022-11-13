import { Button, FormControl, FormLabel, Heading, Input, useColorMode, VStack } from "@chakra-ui/react";
import { useUserData } from "../../Context/UserDataContext";

function EditPostForm ( props ) {
    const { editPost } = useUserData();
    const { colorMode } = useColorMode();
    return (
        <form onSubmit={( e ) => editPost( e, props.id )}>
            <VStack>
                <Heading as='h3' size='lg'>edit post</Heading>
                <FormControl>
                    <FormLabel htmlFor="title">New Title</FormLabel>
                    <Input
                        type='text'
                        placeholder='New Title'
                        id='title'
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="content">New Content</FormLabel>
                    <Input
                        type='text'
                        placeholder='New Content'
                        id='content'
                    />
                </FormControl>
                <Button
                    mt={4}
                    bg={colorMode === "light" ? "gray.800" : "gray.200"}
                    color={colorMode === "light" ? "gray.200" : "gray.800"}
                    _hover={{ bg: colorMode === "light" ? "gray.700" : "gray.300" }}
                    isLoading={props.isSubmitting}
                    type='submit'
                >
                    Submit
                </Button>
            </VStack>
        </form>
    );
}

export default EditPostForm;