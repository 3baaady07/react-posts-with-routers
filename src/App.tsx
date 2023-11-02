import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import Layout from "./Layout";
import Home from "./Home";
import NewPost, { action as newPostAction } from "./NewPost";
import PostPage, { action as postPageAction } from "./PostPage";
import About from "./About";
import Missing from "./Missing";
import BlogError from "./BlogError";
import EditPost, { action as editPostAction } from "./EditPost";
import PostsSource from "./PostsSource";
import { StoreProvider } from "easy-peasy";
import store from "./store";


const router = createBrowserRouter(createRoutesFromElements(
   <Route Component={Layout}>
      <Route Component={PostsSource}  errorElement={<BlogError />}>
         <Route path="/" >
            <Route index Component={Home} />
            <Route path='posts' errorElement={<BlogError />} >
               <Route path="new-post" Component={NewPost} action={newPostAction} />
               <Route path=':id' >
                  <Route index Component={PostPage} action={postPageAction} />
                  <Route path='edit' Component={EditPost} action={editPostAction} />
               </Route>
            </Route>
         </Route>
      </Route>
      <Route path='about' Component={About} />
      <Route path='*' Component={Missing} />
   </Route>
));

const App = () =>
{
   return (
      <div className="App">
         <StoreProvider store={store}>
            <RouterProvider router={router} />
         </StoreProvider>
      </div>
   );
}

export default App;
