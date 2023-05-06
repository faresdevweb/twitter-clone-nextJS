import React,{ useState } from 'react'
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

    const handleRegister = async (event) => {
        event.preventDefault();
        if (
          register.email.trim() !== "" &&
          register.username.trim() !== "" &&
          register.password.trim() !== ""
        ) {
          const newUser = {
            email: register.email,
            username: register.username,
            password: register.password,
            profileImage: "/default-avatar.png"
          };
      
          const response = await fetch("http://localhost:5000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newUser),
          });
          const createdUser = await response.json();
      
          dispatchUsers({ type: "REGISTER", payload: createdUser });
          dispatchUsers({ type: "SIGN_IN_SUCCESS", payload: createdUser });
          router.push("/home");
        }
      };
      

    const handleLogin = async (event) => {
        event.preventDefault();
        if (
          signInForm.email.trim() !== "" &&
          signInForm.password.trim() !== ""
        ) {
          const signInUser = async (email, password) => {
            const response = await fetch("http://localhost:5000/users");
            const users = await response.json();
            const user = users.find(
              (user) => user.email === email && user.password === password
            );
            return user;
          };
      
          const signedInUser = await signInUser(signInForm.email, signInForm.password);
      
          if (signedInUser) {
            dispatchUsers({
              type: "SIGN_IN_SUCCESS",
              payload: {
                id: signedInUser.id,
                username: signedInUser.username,
                email: signedInUser.email
              },
            });
            router.push("/home");
          } else {
            console.log("User not found");
          }
        }
      };

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