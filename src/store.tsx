import { Action, Computed, Thunk, action, computed, createStore, createTypedHooks, thunk } from "easy-peasy";
import { IPost } from "./@types/post";

export interface PostsModel
{
   posts: IPost[];
   setPosts: Action<PostsModel, IPost[]>;
   savePost: Thunk<PostsModel, IPost>;
   getPostById: Computed<PostsModel, (id: string) => IPost | undefined, IPost>;
   editPost: Action<PostsModel, IPost>;
   postCount: Computed<PostsModel, number>;
   deletePost: Thunk<PostsModel, string>;
   isPostsLoading: boolean;
   setIsPostsLoading: Action<PostsModel, boolean>;
   search: string;
   setSearch: Action<PostsModel, string>;
}

const store = createStore<PostsModel>({
   posts: [],
   setPosts: action((state, payload) =>
   {
      state.posts = payload;
   }),

   savePost: thunk((actions, newPost, helpers) =>
   {
      const { posts } = helpers.getState();
      const post = posts.find(p => p.id === newPost.id);
      if(!post)
      {
         actions.setPosts([...posts, newPost]);
      }
   }),

   getPostById: computed((state) => (id: string) => state.posts.find(post => post.id === id)),

   editPost: action((state, payload) => {
      const post = state.posts.find(p => p.id === payload.id);
      if(post)
      {
         post.title = payload.title;
         post.body = payload.body;
         post.datetime = payload.datetime;
      }
   }),
   
   postCount: computed((state) => state.posts.length),

   deletePost: thunk((actions, id, helpers) =>
   {
      const { posts } = helpers.getState();
      actions.setPosts(posts.filter(post => post.id !== id))
   }),

   isPostsLoading: false,
   setIsPostsLoading: action((state, payload) =>
   {
      state.isPostsLoading = payload
   }),

   search: "",
   setSearch: action((state, payload) =>
   {
      state.search = payload
   })
})

export default store;


const typedHooks = createTypedHooks<PostsModel>();

export const useStoreActions = typedHooks.useStoreActions;
export const useStoreDispatch = typedHooks.useStoreDispatch;
export const useStoreState = typedHooks.useStoreState;