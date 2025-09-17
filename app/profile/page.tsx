//<pre>{JSON.stringify(user, null, 2)}</pre>
'use client';
import { useUser } from "@auth0/nextjs-auth0"

export default function Profile() {
  const { user, isLoading } = useUser();
  return (
    <>
      {isLoading && <p>Loading...</p>}
      {user && (
        <div style={{ textAlign: "left" }}>
          <img
            src={user.picture}
            alt="Profile"
            style={{ borderRadius: "50%", width: "80px", height: "80px" }}
          />
          <h1>Name: {user.given_name} {user.family_name}</h1>
          <p>Email: {user.email}</p>
         
        </div>
      )}
    </>
  );
}
