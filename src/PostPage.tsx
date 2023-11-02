import { ActionFunctionArgs, Form, Link, redirect, useActionData, useNavigate, useNavigation, useParams } from 'react-router-dom';
import api from './api/posts';
import { useStoreActions, useStoreState } from './store';
import { AxiosError } from 'axios';

interface IActionResult
{
   isSuccess: boolean,
   message: string,
   payload?: string
}

export const action = async ({ request }: ActionFunctionArgs) =>
{
   const formData = await request.formData();
   const postId = formData.get("id");

   try
   {
      const data = await api.delete(`/posts/${postId}`);
      const actionResult: IActionResult = {
         isSuccess: true,
         message: "",
         payload: postId?.toString()
      }

      return actionResult;

   }
   catch (err)
   {
      if (err instanceof AxiosError)
      {
         const actionResult: IActionResult = {
            isSuccess: false,
            message: err.response!.statusText,
         }

         return actionResult;
      }

      if (typeof err == "string")
      {
         const actionResult: IActionResult = {
            isSuccess: false,
            message: err,
         }

         return actionResult;
      }
      else if (err instanceof Error)
      {
         const actionResult: IActionResult = {
            isSuccess: false,
            message: err.message,
         }

         return actionResult;
      }
   }

   const actionResult: IActionResult = {
      isSuccess: false,
      message: "Something went wrong",
   }

   return actionResult;
}

const PostPage = () =>
{
   const getPostById = useStoreState((state) => state.getPostById)
   const { id } = useParams()
   const post = getPostById(id!)
   const navigate = useNavigate();
   const navigation = useNavigation();
   const deletePost = useStoreActions((state) => state.deletePost)
   const actionResult = useActionData() as IActionResult;

   if (actionResult)
   {
      if (actionResult.isSuccess)
      {
         deletePost(actionResult.payload!);
         navigate("../../..");
      }
   }

   return (
      <main className='PostPage'>
         <Link to="../.." className="back-button">&larr; <span>Back to posts</span></Link>
         {post && <article className='post'>
            <h2>{post.title}</h2>
            <p className="postDate">{post.datetime}</p>
            <p className="postBody">{post.body}</p>
            <Form method='delete'>
               <input type="hidden" name="id" value={post.id} />
               <button type='submit' disabled={navigation.state === "submitting" || navigation.state === "loading"}>
                  {navigation.state === "submitting" || navigation.state === "loading" ? "Deleting..." : "Delete Post"}
               </button>
               <Link to="edit">Edit post</Link>
            </Form>
         </article>}
      </main>
   )
}

export default PostPage;