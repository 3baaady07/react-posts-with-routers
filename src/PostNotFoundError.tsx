import { Link, useAsyncError } from "react-router-dom";

const PostNotFoundError = () =>
{
   const asyncError = useAsyncError();
   
   const errMsg = typeof asyncError === "string" ? asyncError : "";
   
   return (
      <main className='PostPage'>
         <h2>Post not found</h2>
         {errMsg && <p>{errMsg}</p>}
         <p>
            <Link to="/">Visit Our Home page</Link>
         </p>
      </main>
   )
}

export default PostNotFoundError;