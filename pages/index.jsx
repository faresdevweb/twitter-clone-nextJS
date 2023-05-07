import React,{ useState } from 'react'
import { useConnection } from '@/hooks/useConnection'
import { useRouter } from 'next/router'
import { UserState } from '@/context/User context/UserContext'

const Index = () => {

    const router = useRouter();

    const [ register, setRegister ] = useState({
        email: "",
        username: "",
        password: "",
    })

    const [ signInForm, setSignInForm ] = useState({
        email: "",
        password: "",
    })

    const { state: {users,currentUser}, dispatchUsers } = UserState();

    const { handleLogin, handleRegister } = useConnection(signInForm, register,router);
  

  return (
    <div className='border border-purple-500 flex flex-col gap-4 max-w-[600px] mx-auto'>
        <form className="border border-green-500 p-5" onSubmit={(event) => handleLogin(event,signInForm.email, signInForm.password)}>
            <h2 className='text-2xl mb-3'>Connection</h2>
           <div className="flex flex-col gap-2">
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    className='border-2 border-gray-500 p-2 rounded-lg'
                    name='email'
                    value={signInForm.email}
                    onChange={(e) => setSignInForm({ ...signInForm, email: e.target.value })}
                />
           </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    className='border-2 border-gray-500 p-2 rounded-lg'
                    name='password'
                    value={signInForm.password}
                    onChange={(e) => setSignInForm({ ...signInForm, password: e.target.value })}
                />
            </div>
            <button className='border border-black py-3 px-2 mt-3'>Se connecter</button>
        </form>
        <form className="border border-green-500 p-5" onSubmit={handleRegister}>
            <h2 className='text-2xl mb-3'>Inscription</h2>
           <div className="flex flex-col gap-2">
                <label htmlFor="email">Email:</label>
                <input 
                    type="text" 
                    className='border-2 border-gray-500 p-2 rounded-lg'
                    name='email'
                    value={register.email}
                    onChange={(e) => setRegister({ ...register, email: e.target.value })}
                />
           </div>
           <div className="flex flex-col gap-2">
                <label htmlFor="username">Username:</label>
                <input 
                    type="text" 
                    className='border-2 border-gray-500 p-2 rounded-lg'
                    name='username'
                    value={register.username}
                    onChange={(e) => setRegister({ ...register, username: e.target.value })}
                />
            </div>
            <div className="flex flex-col gap-2">
                <label htmlFor="password">Password:</label>
                <input 
                    type="password" 
                    className='border-2 border-gray-500 p-2 rounded-lg'
                    name='password'
                    value={register.password}
                    onChange={(e) => setRegister({ ...register, password: e.target.value })}
                />
            </div>
            <button className='border border-black py-3 px-2 mt-3'>S'inscrire</button>
        </form>
    </div>
  )
}

export default Index