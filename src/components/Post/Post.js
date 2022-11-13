import { useEffect } from "react";
import AddCommentForm from "../Comment/Add-comment-form";
import React from 'react';
import { useAuth } from "../../Context/AuthContext";
import { useUserData } from "../../Context/UserDataContext";
import Comments from "../Comment/Comments";
import EditPostForm from "./editPostForm";
import { Button, Heading, HStack, Image, useColorMode, VStack } from '@chakra-ui/react';



function Post () {
    const { canDo } = useAuth();
    const { fetchData, deletePost, postObj, showEditForm } = useUserData();
    const { colorMode } = useColorMode();

    useEffect( () => {
        fetchData();
    }, [ postObj.reRender, postObj.edit ] );
    return (
        <>
            {postObj.posts ? postObj.posts.map( ( post, idx ) => {
                return (
                    <VStack
                        key={idx}
                        bg={colorMode === "light" ? "gray.200" : "gray.800"}
                        w="100vw"
                        p={4}
                        pt={2}
                        rounded="md"
                        shadow="md"
                    >
                        <VStack>
                            <Image
                                src={post.img}
                                alt={post.title}
                                borderRadius="full"
                                boxSize="150px"
                            />
                            <VStack>
                            <Heading as='h2' size="lg">Title: {post.title}</Heading>
                            <Heading as='p' size='md'>Content: {post.content}</Heading>
                            <Heading as='h3' size='md' m={4}>Author: {post.user.username}</Heading>
                            </VStack>
                        </VStack>
                        <HStack>
                            {canDo( 'update', post.user.id ) === true ?
                                <Button
                                    onClick={() => { showEditForm(); }}
                                    bg={colorMode === "light" ? "gray.800" : "gray.200"}
                                    color={colorMode === "light" ? "gray.200" : "gray.800"}
                                    _hover={{ bg: colorMode === "light" ? "gray.700" : "gray.300" }}
                                >
                                    Edit Post
                                </Button>
                                : null}
                            {canDo( 'delete', post.user.id ) === true ?
                                <Button
                                    onClick={() => { deletePost( post.id ); }}
                                    bg={colorMode === "light" ? "gray.800" : "gray.200"}
                                    color={colorMode === "light" ? "gray.200" : "gray.800"}
                                    _hover={{ bg: colorMode === "light" ? "gray.700" : "gray.300" }}
                                    ml="1rem"
                                >
                                    Delete Post
                                </Button>
                                : null}
                        </HStack>
                        {postObj.showEdit &&
                            <EditPostForm id={post.id} />
                        }
                        <VStack
                            p={10}
                        >
                            {!post.comments && <Heading as='h1' size='4xl' noOfLines={1}>No comments right now</Heading>}
                            {post.comments &&
                                <Heading as="h3" size='xl' noOfLines={1}>Comments</Heading>
                            }
                            {post.comments && post.comments.map( ( comment, idx ) => {
                                return (
                                    <Comments comment={comment} key={idx} idx={idx} />
                                );
                            } )}
                            <AddCommentForm postId={post.id} />
                        </VStack>
                    </VStack>
                );
            } ) : <Heading as='h1' size='4xl' noOfLines={1}>
                No posts right now
            </Heading>}
        </>
    );
}
export default Post;