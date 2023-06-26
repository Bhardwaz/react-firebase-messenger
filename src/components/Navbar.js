import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import "./Navbar.css";
import { auth, db } from "../firebase";
import { signOut } from "firebase/auth";
import { updateDoc, doc } from "firebase/firestore";
import { AuthContext } from "../context/auth";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);

  const handleSignOut = async () => {
    await updateDoc(doc(db, "users", auth.currentUser.uid), {
      isOnline: false,
    });
    await signOut(auth);
    navigate("/login");
  };
  return (
    <nav>
      <h3>{<NavLink to={user ? "/" : "/login"}> Messenger </NavLink>}</h3>
      <div>
        {user ? (
          <>
            <NavLink to={"/profile"}> Profile </NavLink>
            <button className="btn" onClick={handleSignOut}>
              Logout
            </button>
          </>
        ) : (
          <>
            <NavLink to={"/register"}> Register </NavLink>
            <NavLink to={"/login"}> Login </NavLink>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
