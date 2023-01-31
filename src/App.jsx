import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Bars } from 'react-loading-icons';



const App = () => {
  const [users, setUsers] = useState([]);
  const [showUsers, setShowUsers] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(()=>{
    try{
      axios.get('https://reqres.in/api/users?page=1')
      .then(resp => {
        setUsers(resp.data.data)
      })
    }catch(ex){
      alert(ex);
    }
  },[])

  const handleShowUsers = () => {
    if(showUsers){
      alert('data is already shown')
    }else{
      setIsLoading(true);
      setTimeout(()=>{
        setShowUsers(true);
        setIsLoading(false);
      },3000)
    }
  }

  return (
    <>
      <div className='pt-5 bg-gradient-to-r from-green-600 to-teal-800 min-h-screen'>
        <div className="container grid place-items-center py-[3rem] w-1/2 m-auto border-4 border-black rounded-lg">
            <div>
              <h1 className='pt-3 text-[1.75rem] font-semibold underline'> Fetch Data from API </h1>
            </div>
            <div className="w-[40%] mt-5 flex justify-between">
              <div className="border bg-green-500 p-2 hover:bg-green-700 hover:ease-in-out duration-200">
                <button onClick={handleShowUsers}> Fetch Data</button>
              </div>
              <div className="border bg-red-500 p-2 hover:bg-red-700 hover:ease-in-out duration-200">
                <button onClick={()=>showUsers === false ? alert("data is already hidden") : setShowUsers(false)}> Hide Data </button>
              </div>
            </div>
        </div>

        <div className='grid place-items-center text-sm'>
          {isLoading && <Bars />}
        </div>

        <div className="user-data grid place-items-center  mt-[1.5rem]">
        <h1 className='text-[1.8rem] font-semibold'> User Data </h1>
        {showUsers && users.map(user=>{
          return(
            <div key={user.id} className='w-[50%] m-auto flex flex-1 justify-between border flex-wrap my-5'>
              <div className="image px-5 w-auto h-auto border-[5px] border-r-red-800 sm:m-auto">
                <img src={user.avatar} alt="user-img" className=' max-h-full'/>
              </div>
              <div className="info border border-solid grow pl-5 leading-loose sm:text-center">
                <div className='text-[1.5rem] underline font-medium font-mono leading-normal'>
                  <h1> Details </h1>
                </div>
                <h1> <b><i> First Name: </i></b>  {user.first_name}</h1>
                <h1> <b><i>  Last Name: </i></b> {user.last_name}</h1>
                <h1> <b><i>  Email: </i></b> {user.email}</h1>
              </div>
            
            </div>
          )
        })}

        </div>
      </div>
    </>
  )

  
}

export default App