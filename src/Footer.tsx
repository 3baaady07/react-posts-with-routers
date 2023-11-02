import { useStoreState } from "./store";

const Footer = () =>
{
   const today = new Date();
   const postCount = useStoreState((state) => state.postCount)
   return (
      <footer className='Footer'>
         <p>Copyright &copy; {today.getFullYear()}</p>
         <p>{postCount}</p>
      </footer>
   )
}

export default Footer;