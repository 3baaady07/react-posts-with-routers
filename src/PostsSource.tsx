import { useEffect } from "react";
import { Outlet } from "react-router-dom";
import { IPost } from "./@types/post";
import api from "./api/posts";
import { useStoreActions } from "./store";

const PostsSource = () =>
{
   const setPosts = useStoreActions((state) => state.setPosts)
   const setIsLoading = useStoreActions(state => state.setIsPostsLoading)

   useEffect(() =>
   {
      setIsLoading(true);
      api.get<IPost[]>('/posts')
         .then(payload =>
         {
            setPosts(payload.data)
            setIsLoading(false);
         });
   }, []);

   return (<Outlet />)
}

export default PostsSource;