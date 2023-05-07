import { UserState } from "@/context/User context/UserContext";

/**
 * 
 * @param {state} signInForm 
 * @param {state} register 
 * @param {NextRouter} router 
 * @returns {handleLogin && handleRegister} function to login and register
 */

export const useConnection = (signInForm, register,router) => {
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
            profileImage: "/default-avatar.png",
            followers: [],
            followed: [],
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

      return { handleRegister, handleLogin }
}