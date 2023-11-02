import { ActionFunctionArgs, Form, redirect, useActionData, useNavigate, useNavigation } from "react-router-dom";
import { IPost } from "./@types/post";
import { format } from "date-fns";
import api from "./api/posts";
import { useStoreActions, useStoreState } from "./store";
import { AxiosError } from "axios";

interface IActionResult
{
   isSuccess: boolean,
   message: string,
   payload?: IPost
}

export const action = async ({ request }: ActionFunctionArgs) =>
{
   const formData = await request.formData();
   const postTitle = formData.get("title");
   const postBody = formData.get("body");
   const postId = formData.get("id");

   try
   {
      if (postTitle === null)
      {
         const actionResult: IActionResult = {
            isSuccess: false,
            message: "title cannot be null",
         }

         return actionResult;
      }

      if (postBody === null)
      {
         const actionResult: IActionResult = {
            isSuccess: false,
            message: "body cannot be null",
         }

         return actionResult;
      }

      const post: IPost = {
         id: postId!.toString(),
         title: postTitle.toString(),
         body: postBody.toString(),
         datetime: format(new Date(), "MMMM dd, yyyy pp")
      }

      await api.post('/posts', post);
      const actionResult: IActionResult = {
         isSuccess: true,
         message: "",
         payload: post
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

const NewPost = () =>
{
   const navigation = useNavigation();
   const savePost = useStoreActions((state) => state.savePost)
   const navigate = useNavigate();
   const posts = useStoreState((state) => state.posts);
   const actionResult = useActionData() as IActionResult;

   if (actionResult)
   {
      if (actionResult.isSuccess)
      {
         savePost(actionResult.payload!);
         navigate("../..");
      }
   }

   const id = posts?.length ? parseInt(posts[posts.length - 1].id) + 1 : 1;

   return (
      <main className="NewPost">
         <h2>New Post</h2>
         {actionResult && !actionResult.isSuccess && <p style={{ color: "red" }}>{actionResult.message}</p>}
         <Form method="post" className="newPostForm">
            <label htmlFor="postTitle">Title:</label>
            <input type="text" name="title" id="postTitle" required />
            <label htmlFor="postBody">Post:</label>
            <textarea name="body" id="postBody" required></textarea>
            <input type="hidden" name="id" value={id} />
            <button type="submit" disabled={navigation.state === "submitting" || navigation.state === "loading"}>
               {navigation.state === "submitting" || navigation.state === "loading" ? "Submitting..." : "Submit"}
            </button>
         </Form>
      </main>
   )
}

export default NewPost;