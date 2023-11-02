import { Link } from 'react-router-dom';
import { useStoreActions, useStoreState } from 'easy-peasy';
import { PostsModel } from './store';

const Nav = () =>
{
   const search = useStoreState<PostsModel>((state) => state.search);
   const setSearch = useStoreActions<PostsModel>((state) => state.setSearch);

   return (
      <nav className='Nav'>
         <form className='searchForm' action="" onSubmit={(e) => e.preventDefault()}>
            <label htmlFor="search">Search Post</label>
            <input name='search' type="text" id="search" placeholder="Search Posts" value={search} onChange={(e) => setSearch(e.target.value)} />
         </form>
         <ul>
            <li><Link to=".">Home</Link></li>
            <li><Link to="posts/new-post">Post</Link></li>
            <li><Link to="about">About</Link></li>
         </ul>
      </nav>
   )
}

export default Nav;