import { Button, FormControl, FormLabel, Heading, Input, Select, useColorMode, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { useAuth } from "../../Context/AuthContext";

function Signup () {
    const { handleSignUp } = useAuth();
    const { colorMode } = useColorMode();
    return (
        <VStack
            w="100vw"
            h="100vh"
            justifyContent="center"
            alignItems="center"
            spacing="20px"
            shadow="md"
            p="20px"
            rounded="md"
            bg={colorMode === "light" ? "purple.200" : "purple.800"}

        >
            <Heading as='h1' size='2xl'>Sign up</Heading>
            <Heading as='h2' size='md'>Please sign in or sign up to see the posts</Heading>
            <form
                onSubmit={( e ) => handleSignUp( e )}
            >
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
                    <FormLabel htmlFor="password">Confirm Password</FormLabel>
                    <Input
                        type="password"
                        name="confirmPassword"
                        id="confirmPassword"
                        bg={colorMode === "light" ? "gray.100" : "gray.700"}
                        border="2px"
                        borderColor="gray.300"
                        rounded="md"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <Input
                        type="email"
                        name="email"
                        id="email"
                        bg={colorMode === "light" ? "gray.100" : "gray.700"}
                        border="2px"
                        borderColor="gray.300"
                        rounded="md"
                    />
                </FormControl>
                <FormControl>
                    <FormLabel htmlFor="role">Role</FormLabel>
                    <Select
                        name="role"
                        id="role"
                        bg={colorMode === "light" ? "gray.100" : "gray.700"}
                        border="2px"
                        borderColor="gray.300"
                        rounded="md"
                    >
                        <option value="user" defaultValue='user'>USER</option>
                        <option value="admin">ADMIN</option>
                    </Select>
                </FormControl>
                <FormControl>
                    <Input
                        type="submit"
                        value="Sign up"
                        bg={colorMode === "light" ? "blue.800" : "blue.300"}
                        color="white"
                        _hover={{ bg: "black" }}
                        mt="20px"
                    />
                </FormControl>
            </form>
            <Heading as='p' size='sm'>Already have an account? <Button
                as={Link}
                to="/"
                color={colorMode === "light" ? "blue.800" : "blue.200"}
                variant="link"
                size="xl"
            >Sign in</Button></Heading>
        </VStack>
    );
}

export default Signup;