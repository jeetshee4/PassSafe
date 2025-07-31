import React from 'react'

const Navbar = () => {
    return (
        <nav className='bg-slate-800 text-white flex justify-around h-[10vh] items-center'>
           <div className="logo font-bold text-xl">
           
            <span className="text-green-800"> &lt;</span>
            Pass
            <span className="text-green-800">Safe/&gt;</span>
           </div>
           <ul className="flex gap-15">
              <a href="/" className="hover:cursor-pointer hover:font-bold"><li>Home</li></a>
              <a href="#" className="hover:cursor-pointer hover:font-bold"><li>About</li></a>
              <a href="#" className="hover:cursor-pointer hover:font-bold"><li>Contact</li></a>
             
           </ul>
        </nav>
    )
}

export default Navbar 