import axios from 'axios'

const api = axios.create({
    baseURL: "http://localhost:3500",
    headers: {
      "content-type": "application/json",
    },
});

export default api;


// import { IPost } from "../@types/post";

// const API_URL = 'http://localhost:3500';

// export const fetchPosts = async () => {
//     const res = await fetch(`${API_URL}/posts`);
//     if (!res.ok) {
//         const err: Error = {
//             name: "API Error",
//             message: "Failed fetching posts."
//         }

//         throw err;
//     }

//     const data: IPost[] = await res.json();
//     return data;
// }

// export const fetchPost = async (id: string | undefined) => {
//     const res = await fetch(`${API_URL}/posts/${id}`);
//     if (!res.ok) {
//         const err: Error = {
//             name: "API Error",
//             message: "Post not found."
//         }

//         throw err;
//     }

//     const data: IPost = await res.json();
//     return data;
// }

// export const deletePost = async (id: string | undefined) => {
//     const res = await fetch(`${API_URL}/posts/${id}`, { method: 'delete' });
//     if (!res.ok) {
//         const err: Error = {
//             name: "API Error",
//             message: "Failed deleting the post."
//         }

//         throw err;
//     }

//     const data = await res.json();
//     return data;
// }

// export const submitPost = async (post: IPost | undefined) => {
//     const res = await fetch(`${API_URL}/posts`, { method: 'post', headers: { 'Content-Type': 'application/json', }, body: JSON.stringify(post) });

//     if (!res.ok) {
//         const err: Error = {
//             name: "API Error",
//             message: "Failed submitting post."
//         }

//         throw err;
//     }

//     const data = await res.json();

//     return data;
// }