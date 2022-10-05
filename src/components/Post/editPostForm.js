import { useUserData } from "../../Context/UserDataContext";

function EditPostForm ( props ) {
    const { editPost } = useUserData();
    return (
        <form onSubmit={( e ) => editPost( e, props.id )}>
            <h3>edit post</h3>
            <label htmlFor="title">New Title</label>
            <input type="text" name="title" id="title" />
            <label htmlFor="content">New Content</label>
            <input type="text" name="content" id="content" />
            <input type="submit" value="submit" />
        </form>
    );
}

export default EditPostForm;