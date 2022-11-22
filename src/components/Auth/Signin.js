import { Button, FormControl, FormLabel, Heading, Input, useColorMode, VStack } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { loginAction } from "../../actions/authActions";

function Signin () {
    const dispatch = useDispatch()
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
            bg={colorMode === "light" ? "authBackground.100" : "authBackground.900"}
        >
            <Heading as='h1' size='2xl'>Sign in</Heading>
            <Heading as='h2' size='md'>Please sign in or sign up to see the posts</Heading>
            <form onSubmit={( e ) => loginAction(e, dispatch)}>
                <FormControl>
                    <FormLabel htmlFor="username">Username</FormLabel>
                    <Input
                        type="text"
                        name="username"
                        id="username"
                        bg={colorMode === "light" ? "input.100" : "input.900"}
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
                        bg={colorMode === "light" ? "input.100" : "input.900"}
                        border="2px"
                        borderColor="gray.300"
                        rounded="md"
                    />
                </FormControl>
                <FormControl>
                    <Input
                        type="submit"
                        value="Sign in"
                        bg={colorMode === "light" ? "authButton.100" : "authButton.900"}
                        mt="10px"
                        color="white"
                        _hover={{ bg: "black" }}
                    />
                </FormControl>
            </form>
            <Heading as='p' size='sm'>Don't have an account? <Button
                as={Link}
                to="/signup"
                color={colorMode === "light" ? "authButton.100" : "authButton.900"}
                variant="link"
                size="xl"
            >Sign up Now</Button></Heading>
        </VStack>
    );
}

export default Signin;