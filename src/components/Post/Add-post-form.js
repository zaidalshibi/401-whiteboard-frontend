import { Button, FormControl, FormLabel, Heading, Input, useColorMode, VStack } from "@chakra-ui/react";
import React from "react";
import { useAuthDispatch, useUserDispatch } from "../../index";
import { logoutAction } from "../../actions/authActions";
import { addPostAction } from "../../actions/userActions";


export default function AddPostForm () {
    const authDispatch = useAuthDispatch();
    const userDispatch = useUserDispatch();
    const { colorMode } = useColorMode();
    return (
        <>
            <VStack
                bg={colorMode === "light" ? "authBackground.100" : "authBackground.900"}
                w="100vw"
                p={4}
                rounded="md"
                shadow="md"
            >
                <Heading as='h1' size='2xl'>Add Post</Heading>
                <form
                    onSubmit={( e ) => { addPostAction( e, userDispatch ); }}
                >
                    <FormControl>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Input
                            type='text'
                            placeholder='Title'
                            id='title'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="content">Content</FormLabel>
                        <Input
                            type='text'
                            placeholder='Content'
                            id='content'
                        />
                    </FormControl>
                    <FormControl>
                        <FormLabel htmlFor="author">Add Image Address</FormLabel>
                        <Input
                            type='text'
                            placeholder='Image Address'
                            id='img'
                        />
                    </FormControl>
                    <FormControl>
                        <Input
                            type='submit'
                            value='Add Post'
                            bg={colorMode === "light" ? "gray.800" : "gray.200"}
                            color={colorMode === "light" ? "gray.200" : "gray.800"}
                            _hover={{ bg: colorMode === "light" ? "gray.700" : "gray.300" }}
                            mt={4}
                        />
                    </FormControl>
                </form>
                <Button
                    onClick={() => { logoutAction( authDispatch ); }}
                >
                    Sign out {JSON.parse( localStorage.getItem( 'username' ) )}
                </Button>
            </VStack>
        </>
    );
}