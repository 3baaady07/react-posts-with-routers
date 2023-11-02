import { Link } from "react-router-dom";
import { IPost } from "./@types/post";

interface Prop {
    post: IPost
}
const PostListItem = ({ post }: Prop) => {
    return (
        <article className="post">
            <Link to={`posts/${post.id}`}>
                <h2>{post.title}</h2>
                <p className="postDate">{post.datetime}</p>
            </Link>
            <p className="postBody">
                {(post.body).length <= 25 ? post.body : `${(post.body.slice(0, 25))}...`}
            </p>
        </article>
    )
}

export default PostListItem;