import { useEffect } from "react";
import AddCommentForm from "../Comment/Add-comment-form";
import React from 'react';
import Comments from "../Comment/Comments";
import EditPostForm from "./editPostForm";
import { Button, Heading, HStack, Image, useColorMode, VStack } from '@chakra-ui/react';
import { canDo } from '../../actions/authActions';
import { deletePostAction, getData, showEditAction } from "../../actions/userActions";
import { useUserDispatch, useUserSelector } from "../../index";


function Post () {
    const userDispatch = useUserDispatch();
    const showEdit = useUserSelector( state => state.user.showEdit );
    const posts = useUserSelector( state => state.user.post );
    const { colorMode } = useColorMode();

    useEffect( () => {
        getData( userDispatch );
    }, [ showEdit ] );
    return (
        <>
            {posts ? posts.map( ( post, idx ) => {
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
                                    onClick={() => { showEditAction( userDispatch, true ); }}
                                    bg={colorMode === "light" ? "gray.800" : "gray.200"}
                                    color={colorMode === "light" ? "gray.200" : "gray.800"}
                                    _hover={{ bg: colorMode === "light" ? "gray.700" : "gray.300" }}
                                >
                                    Edit Post
                                </Button>
                                : null}
                            {canDo( 'delete', post.user.id ) === true ?
                                <Button
                                    onClick={() => { deletePostAction( userDispatch, post.id ); }}
                                    bg={colorMode === "light" ? "gray.800" : "gray.200"}
                                    color={colorMode === "light" ? "gray.200" : "gray.800"}
                                    _hover={{ bg: colorMode === "light" ? "gray.700" : "gray.300" }}
                                    ml="1rem"
                                >
                                    Delete Post
                                </Button>
                                : null}
                        </HStack>
                        {showEdit &&
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