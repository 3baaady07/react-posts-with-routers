import { AxiosError } from 'axios';
import { useAsyncError, useRouteError } from 'react-router-dom';

const BlogError = () =>
{
   const asyncError = useAsyncError();
   const routeError = useRouteError();

   let errMeg: string = "";

   if (typeof routeError === "string")
   {
      errMeg = routeError;
   }
   else if (asyncError instanceof AxiosError)
   {
      errMeg = asyncError.message;
   }

   return (
      <main className='Home'>
         <p>Error: {errMeg}</p>
      </main>
   )
}

export default BlogError;