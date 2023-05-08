export const useFollow = (user, currentUser, setUserData, users, dispatchUsers) => {
  const handleFollow = async () => {
    const newFollow = {
      username: currentUser.username,
      profileImage: currentUser.profileImage,
    };

    const isAlreadyFollowing = user[0].followers.some(
      (follower) => follower.username === currentUser.username
    );

    if (!isAlreadyFollowing) {
      const response = await fetch(`http://localhost:5000/users/${user[0].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followers: [...user[0].followers, newFollow],
        }),
      });

      const updatedUser = await response.json();
      setUserData([updatedUser]);

      const currentUserInUsers = users.find((user) => user.username === currentUser.username);

      const updatedCurrentUser = {
        ...currentUserInUsers,
        followed: currentUserInUsers.followed ? [...currentUserInUsers.followed, { username: user[0].username }] : [{ username: user[0].username }],
      };

      dispatchUsers({ type: "UPDATE_CURRENT_USER", payload: updatedCurrentUser });

      // Update currentUser in db.json
      const updateCurrentUserResponse = await fetch(`http://localhost:5000/users/${currentUserInUsers.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCurrentUser),
      });

      await updateCurrentUserResponse.json();

    } else {
      const unfollow = user[0].followers.filter(
        (follower) => follower.username !== currentUser.username
      );

      const response = await fetch(`http://localhost:5000/users/${user[0].id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          followers: unfollow,
        }),
      });

      const updatedUser = await response.json();
      setUserData([updatedUser]);

      const currentUserInUsers = users.find((user) => user.username === currentUser.username);

      const updatedCurrentUser = {
        ...currentUserInUsers,
        followed: currentUserInUsers.followed ? currentUserInUsers.followed.filter(
          (followedUser) => followedUser.username !== user[0].username
        ) : [],
      };

      dispatchUsers({ type: "UPDATE_CURRENT_USER", payload: updatedCurrentUser });

      // Update currentUser in db.json
      const updateCurrentUserResponse = await fetch(`http://localhost:5000/users/${currentUserInUsers.id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedCurrentUser),
      });

      await updateCurrentUserResponse.json();
    }
  };

  return { handleFollow };
};
