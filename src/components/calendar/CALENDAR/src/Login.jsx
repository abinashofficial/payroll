// import { useFrappeAuth } from "frappe-react-sdk";

export const Login = () => {
  const {
    currentUser,
    isValidating,
    isLoading,
    login,
    logout,
    error,
    updateCurrentUser,
    getUserCookie,
  } = any

  if (isLoading) return <div>loading...</div>;

  // render user
  return (
    <div>
      {currentUser}
      <button
        onClick={() => login({ username: "administrator", password: "1234" })}
      >
        Login
      </button>
      <button onClick={logout}>Logout</button>
      <button onClick={updateCurrentUser}>Fetch current user</button>
    </div>
  );
};
