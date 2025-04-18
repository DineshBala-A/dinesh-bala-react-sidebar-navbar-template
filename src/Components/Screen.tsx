import NavBar from './Navigations/NavBar';
import { Outlet } from 'react-router';
function Screen() {
  return (
    <div className="bg-white dark:bg-[#191919] h-screen text-black dark:text-white transition duration-300">
      <NavBar/>
      <Outlet/>
    </div>
  )
}


export default Screen
