import PostListItem from "./PostListItem";
import { useStoreState } from "./store";

const Home = () =>
{
   const posts = useStoreState((state) => state.posts)
   const search = useStoreState((state) => state.search);
   const isLoading = useStoreState((state) => state.isPostsLoading)

   const displayedPosts = posts?.filter(p =>
   {
      return search ? p.title.toLocaleLowerCase().includes(search.toLocaleLowerCase()) || p.body.toLocaleLowerCase().includes(search.toLocaleLowerCase()) : posts;
   });

   if (isLoading)
   {
      return (
         <main className="Home">
            <p>Loading...</p>
         </main>
      )
   }
   else if (posts !== null && displayedPosts?.length !== 0)
   {
      return (
         <main className="Home">
            {displayedPosts?.map(p => <PostListItem key={p.id} post={p} />)}
         </main>
      )
   }
   else
   {
      return (
         <main className="Home">
            <p style={{ marginTop: "2rem" }}>
               No posts to display.
            </p>
         </main>
      )
   }
}

export default Home;