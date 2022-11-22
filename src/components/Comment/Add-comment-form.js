import { Button, FormControl, Heading, HStack, Input, useColorMode, VStack } from '@chakra-ui/react';
import React from 'react';
import { useAuthDispatch, useUserDispatch } from '../../index';
import { logoutAction } from '../../actions/authActions';
import { addCommentAction } from '../../actions/userActions';


function AddCommentForm ( props ) {
    const authDispatch = useAuthDispatch();
    const userDispatch = useUserDispatch();
    const { colorMode } = useColorMode();
    return (
        <>
            <VStack
                w="80vw"
                pt={10}
                pb={10}
                rounded="md"
                shadow="md"
                bg={colorMode === "light" ? "authBackground.100" : "authBackground.900"}
            >
                <Heading as='h2' size='xl'>Add Comment</Heading>
                <form
                    onSubmit={( e ) => addCommentAction( e, props.postId, userDispatch )}
                >
                    <HStack
                        w="100%"
                        justifyContent="space-between"
                    >
                        <FormControl>
                            <Input
                                type='text'
                                placeholder='Comment here'
                                id='content'
                            />
                        </FormControl>
                        <FormControl>
                            <Input
                                type='submit'
                                value='Add Comment'
                                bg='gray.800'
                                color='gray.200'
                                _hover={{ bg: 'gray.700' }}
                                mt={4}
                            />
                        </FormControl>
                    </HStack>
                </form>
                <Button
                    onClick={() => { logoutAction( authDispatch ); }}
                >
                    Sign Out {JSON.parse( localStorage.getItem( 'username' ) )}
                </Button>
            </VStack>
        </>
    );
}

export default AddCommentForm;