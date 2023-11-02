import { ActionFunctionArgs, Form, redirect, useActionData, useNavigate, useNavigation, useParams } from "react-router-dom";
import { format } from "date-fns";
import { IPost } from "./@types/post";
import api from "./api/posts";
import { AxiosError } from "axios";
import { useStoreActions, useStoreState } from "./store";

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
      id: postId ? postId.toString() : "1",
      title: postTitle.toString(),
      body: postBody.toString(),
      datetime: format(new Date(), "MMMM dd, yyyy pp")
   }

   try
   {
      const res = await api.put(`/posts/${post.id}`, post);
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
}

const EditPost = () =>
{
   const getPostById = useStoreState((state) => state.getPostById)
   const editPost = useStoreActions((state) => state.editPost)
   const { id } = useParams()
   const post = getPostById(id!)
   const navigate = useNavigate()
   const navigation = useNavigation();

   const actionResult = useActionData() as IActionResult;

   if (actionResult)
   {
      if (actionResult.isSuccess)
      {
         editPost(actionResult.payload!);
         navigate("..");
      }
   }

   return (
      <main className="NewPost">
         {post && <>
            <h2>Edit Post</h2>
            <Form method="put" className="newPostForm">
               <label htmlFor="postTitle">Title:</label>
               <input type="text" name="title" id="postTitle" required defaultValue={post.title} />
               <label htmlFor="postBody">Post:</label>
               <textarea name="body" id="postBody" required defaultValue={post.body}></textarea>
               <input type="hidden" name="id" value={post.id} />
               <button type="submit" disabled={navigation.state === "submitting" || navigation.state === "loading"}>
                  {navigation.state === "submitting" || navigation.state === "loading" ? "Submitting..." : "Submit"}
               </button>
            </Form>
         </>
         }
      </main>
   )
}

export default EditPost;