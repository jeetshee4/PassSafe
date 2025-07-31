import React, { useEffect, useState } from 'react'
import { useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
    const [show, setShow] = useState(true)
    const [form, setform] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])


    const getPasswords = async()=>{
        let req = await fetch("http://localhost:3000/")
        let passwords = await req.json()
        setPasswordArray(passwords)
        
        console.log(passwords)

    }




    useEffect(() => {
        getPasswords()
        
    }, [])



    const ref = useRef()
    const passwordRef = useRef()
    const showPassword = () => {


        setShow((prev) => !prev)


    }


    const savePassword = async() => {

        // if any such id exists in the database then delete it
         await  fetch("http://localhost:3000", { method : "DELETE" , headers : { "Content-Type": "application/json" }, body: JSON.stringify({ id: form.id }) })   



        setPasswordArray([...passwordArray, {...form , id: uuidv4()}])
         await  fetch("http://localhost:3000", { method : "POST" , headers : { "Content-Type": "application/json" }, body: JSON.stringify({...form , id: uuidv4()}) })
        
        
        // 
        
        // localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form , id: uuidv4()}]))
        // console.log(passwordArray)
        setform({ site: "", username: "", password: "" })
    }


    const handleDelete = async(id) => {
         console.log("Deleting Password with id:" , id)
         let c = confirm("Do you really want to delete this password?")
         if(c) {
         setPasswordArray(passwordArray.filter(item=>item.id !== id))
        //  localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)))
          let res = await  fetch("http://localhost:3000", { method : "DELETE" , headers : { "Content-Type": "application/json" }, body: JSON.stringify({ id }) })   
         }
        // console.log(passwordArray)
    }

    const handleEdit = (id) => {
       console.log("Editing Password with id:" , id)
       setform({...passwordArray.filter(i=>i.id === id) [0] , id: id})
       setPasswordArray(passwordArray.filter(item=>item.id !== id))

    //    Here we will not be saving the password to localStorage immediately as 
    // To  make the editing process atomic so that the data before edit is preserved in case he close the browser afer clicking on edit

    }






    const handleChange = (e) => {
        setform({ ...form, [e.target.name]: e.target.value })
    }



    const copyText = (text) => {
        toast('Copied to Clipboard', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: false,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",

        });
        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"

            />
            <div>
                <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div>


                <div className="mx-auto mycontainer h-[85vh] overflow-auto">
                    <h1 className="text-4xl text font-bold text-center">
                        <div className="logo font-bold text-xl">
                            <span className="text-green-800"> &lt;</span>
                            Pass
                            <span className="text-green-800">Safe/&gt;</span>
                        </div>
                    </h1>
                    <p className="text-green-700 text-lg text-center">Your Own Password Manager Application</p>
                    <div className="text-black flex flex-col p-4 gap-3 items-center">
                        <input onChange={handleChange} value={form.site} placeholder="Enter Website URL" type="text" name="site" id="" className="bg-white text-black border-2 border-green-800 w-full rounded-full p-4 py-1" />
                        <div className="flex w-full justify-between gap-3">
                            <input onChange={handleChange} value={form.username} placeholder="Enter Username" type="text" name="username" id="" className="bg-white text-black border-2 border-green-800 w-full rounded-full p-4 py-1" />
                            <div className="relative">

                                <input ref={passwordRef} onChange={handleChange} value={form.password} placeholder="Enter Password" type={show ? "password" : "text"} name="password" id="" className="bg-white text-black border-2 border-green-800 w-full rounded-full p-4 py-1" />

                                <span className="p-1 absolute right-0 top-1 hover:cursor-pointer" onClick={showPassword}>
                                    <span ref={ref} className="material-symbols-outlined">
                                        {show ? 'visibility_off' : 'visibility'}
                                    </span>
                                </span>
                            </div>


                        </div>
                        <button onClick={savePassword} className="text-white flex justify-center items-center bg-green-700 rounded-full w-fit p-2 border-green-400 border-2 hover:bg-green-300">
                            <lord-icon
                                src="https://cdn.lordicon.com/sbnjyzil.json"
                                trigger="hover"
                            >
                            </lord-icon>
                            Add Password</button>
                    </div>

                    <div className="passwords">
                        <h2 className="font-bold">Your Passwords</h2>
                        {passwordArray.length === 0 && <div> No passwords to show </div>}
                        {passwordArray.length != 0 && <table className="table-auto w-full rounded-xl overflow-hidden">
                            <thead className="bg-green-800 text-white">
                                <tr>
                                    <th className="py-2">Site</th>
                                    <th className="py-2">Username</th>
                                    <th className="py-2">Password</th>
                                    <th className="py-2">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="bg-green-100">
                                {
                                    passwordArray.map((item, index) => {
                                        return <tr key={index}>
                                            <td className="py-2 border border-white text-center ">
                                                <div className='flex justify-center items-center gap-1'>
                                                    <div>
                                                        <a href={item.site} target="_blank">{item.site}</a>

                                                    </div>


                                                    <div className="material-symbols-outlined hover:cursor-pointer " onClick={() => { copyText(item.site) }}>
                                                        content_copy
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="py-2 border border-white text-center ">
                                                <div className='flex justify-center items-center gap-2'>
                                                    <div>
                                                        <a href={item.username} target='_blank'>  {item.username}</a>


                                                    </div>

                                                    <div className="material-symbols-outlined hover:cursor-pointer " onClick={() => { copyText(item.username) }}>
                                                        content_copy
                                                    </div>
                                                </div>

                                            </td>
                                            <td className="py-2 border border-white text-center">
                                                <div className='flex justify-center items-center gap-2'>
                                                    <div>
                                                        <a href={item.password} target='_blank'>{"*".repeat(item.password.length)}</a>


                                                    </div>
                                                    <div className="material-symbols-outlined hover:cursor-pointer " onClick={() => { copyText(item.password) }}>
                                                        content_copy
                                                    </div>
                                                </div>


                                            </td>

                                            <td className="py-2 border border-white text-center ">
                                                <div className='flex justify-center items-center gap-2'>
                                                    <button  onClick={()=>{handleDelete(item.id)}} className="p-1 border border-green-800 flex justify-center items-center rounded-full hover:cursor-pointer mx-4 hover:bg-green-500">
                                                        Delete
                                                        <div className="material-symbols-outlined">
                                                            delete
                                                        </div>
                                                    </button>
                                                     <button onClick={()=>{handleEdit(item.id)}} className="p-1 border border-green-800 flex justify-center items-center rounded-full hover:cursor-pointer mx-4 hover:bg-green-500">
                                                        Edit 
                                                        <div className="material-symbols-outlined">
                                                            edit
                                                        </div>
                                                    </button>



                                                </div>



                                            </td>

                                        </tr>
                                    })
                                }

                            </tbody>
                        </table>
                        }



                    </div>

                </div>






            </div>
        </>
    )
}

export default Manager