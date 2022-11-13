import { Button, FormControl, FormLabel, Heading, Input, useColorMode, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Signin () {
    const { handleSignIn } = useAuth();
    const { colorMode } = useColorMode();

    return (
        <VStack
            w="100vw"
            h="99vh"
            justifyContent="center"
            alignItems="center"
            spacing="20px"
            shadow="md"
            p="20px"
            rounded="md"
            bg={colorMode === "light" ? "purple.200" : "purple.800"}
        >
            <Heading as='h1' size='2xl'>Sign in</Heading>
            <Heading as='h2' size='md'>Please sign in or sign up to see the posts</Heading>
            <form onSubmit={( e ) => handleSignIn( e )}>
                <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        bg={colorMode === "light" ? "gray.100" : "gray.700"}
                        border="2px"
                        borderColor="gray.300"
                        rounded="md"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="password">Password</FormLabel>
                    <Input
                        type="password"
                        name="password"
                        id="password"
                        bg={colorMode === "light" ? "gray.100" : "gray.700"}
                        border="2px"
                        borderColor="gray.300"
                        rounded="md"
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type="submit"
                        value="Sign in"
                        bg={colorMode === "light" ? "blue.800" : "blue.300"}
                        mt="10px"
                        color="white"
                        _hover={{ bg: "black" }}
                    />
                </FormControl>
            </form>
            <Heading as='p' size='sm'>Don't have an account? <Button
                as={Link}
                to="/signup"
                color={colorMode === "light" ? "blue.800" : "blue.200"}
                variant="link"
                size="xl"
            >Sign up Now</Button></Heading>
        </VStack>
    );
}

export default Signin;