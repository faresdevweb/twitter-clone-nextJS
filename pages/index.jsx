import React,{ useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useConnection } from '@/hooks/useConnection'
import { useRouter } from 'next/router'
import { UserState } from '@/context/User context/UserContext'

const Index = () => {

    const router = useRouter();

    const [ inscription, setInscription ] = useState(false);
    const [ errorModal, setErrorModal ] = useState(false);
    const [ mustBeConnectModal, setMustBeConnectModal ] = useState(false);

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
    const { handleLogin, handleRegister } = useConnection(signInForm, register,router,errorModal,setErrorModal);

    useEffect(() => {
        const shouldShowModal = router.query.mustBeConnectModal === "true";
        setMustBeConnectModal(shouldShowModal);
      }, [router.query.mustBeConnectModal]);
    
      useEffect(() => {
        setTimeout(() => {
            if (!mustBeConnectModal && router.query.mustBeConnectModal === "true") {
                router.push("/", undefined, { shallow: true });
              }
        },3000)
      }, [mustBeConnectModal]);
    

    const toggleConnection = (event) => {
        event.preventDefault();
        setInscription(!inscription)
    }

  return (
    <div className="relative borde-2 xs:w-[300px] sm:w-[450px] md:w-[800px] mx-auto h-screen mt-[100px] rounded-lg">
        <div>
        {
            inscription ? (
                <form 
                    className="border-2 rounded-lg p-5" 
                    onSubmit={(event) => handleLogin(event,signInForm.email, signInForm.password)}
                
                    >
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
                    <button className=' bg-cyan-500 text-white py-3 px-2 mt-3 rounded-lg'>Se connecter</button>
                    <button 
                        className='ml-5 hover:underline pb-2' 
                        onClick={toggleConnection}
                    >
                        S'inscrire
                    </button>
                </form>
            ) : (
                <form className="border-2 rounded-lg  p-5" >
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
                    <div className="flex flex-col gap-2" onSubmit={handleLogin}>
                        <label htmlFor="password">Password:</label>
                        <input 
                            type="password" 
                            className='border-2 border-gray-500 p-2 rounded-lg'
                            name='password'
                            value={register.password}
                            onChange={(e) => setRegister({ ...register, password: e.target.value })}
                        />
                    </div>
                    <button className='bg-cyan-500 text-white py-3 px-2 mt-3 rounded-lg'>S'inscrire</button>
                    <button className='ml-5 hover:underline pb-2' onClick={toggleConnection}>Déjà inscrit ?</button>
                </form>
            )
        }
        </div>
        {
            errorModal ? (
                <motion.div 
                    className='absolute top-[-80px] right-[25%] w-[450px] py-3 px-2 rounded-lg bg-red-500 font-bold'
                    animate={{
                        x: errorModal ? 10 : 0,
                        opacity: errorModal ? 1 : 0.2
                      }}
                      initial={{
                        opacity: 0.1
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 150
                      }}
                >
                    <p>User not found!</p>
                </motion.div>
            ) : <></>
        }
        {
            mustBeConnectModal ? (
                <motion.div 
                    className='absolute top-[-80px] right-[25%] w-[450px] py-3 px-2 rounded-lg bg-cyan-500 font-bold xs:w-[50%] xs:mx-auto'
                    animate={{
                        x: errorModal ? 10 : 0,
                      }}
                      transition={{
                        type: "spring",
                        stiffness: 150
                      }}
                >
                    <p>You must be connect to acces the site !</p>
                </motion.div>
            ) : <></>
        }
    </div>
  )
}

export default Index


