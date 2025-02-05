import { useState } from "react";
import { CiCirclePlus } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import {FaMoon, FaSun } from "react-icons/fa";


function Navbar(){

const [darkMode, setDarkMode] = useState(false); // state for dark mode
    const navigate = useNavigate();

    //function to toggle mode

    function toggleDarkMode(){
        setDarkMode(!darkMode);
        if(!darkMode){
            document.documentElement.classList.add("dark");

        }else {
            document.documentElement.classList.remove("dark");
        }
    }


  return (
    <>
   <nav className="flex justify-between mt-2 p-5 rounded-md  container mx-auto items-center p4 bg-gray-400 text-white  dark:bg-gray-800 ">
<h1 className="text-2xl font-bold"> <a href="/HomePage">EHSAN.NG</a> </h1>
 <div className="flex items-center space-x-4"> 
<CiCirclePlus  className="cursor-pointer hover:text-gray-3000"
size={24}
onClick={() => navigate("/CreatePage")}
/>
{darkMode ? (

<FaSun
className="cursor-pointer hover:text-gray-300"
size={24}
onClick={toggleDarkMode}
/>
) : (
<FaMoon 
className="cursor-pointer hover:text-gray-300"  
size={24}
 onClick={toggleDarkMode} />


)}

 </div>
   </nav>
   </>
  )
}

export default Navbar
