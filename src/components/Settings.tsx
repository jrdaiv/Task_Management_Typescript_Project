import React, { useState, useContext, FormEvent } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import NavBarHome from "./NavBarHome";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext from "../context/UserContext";
import { useNavigate } from "react-router-dom";


interface User {
  id?: string;
  username: string;
  email: string;
  password: string;
  isLoggedIn: boolean;

}

const Settings: React.FC = () => {
  const { user: authUser, isAuthenticated, isLoading, logout } = useAuth0();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [userName, setUserName] = useState<string>(authUser?.name || "");
  const [email, setEmail] = useState<string>(authUser?.email || "");
  const [password, setPassword] = useState<string>("");
  
  // loading settings page 
  if (isLoading) {
    return <Spinner animation="border" variant="primary" />;
  }

  


  function handleUpdate(event: FormEvent<HTMLFormElement>): void {
    event.preventDefault();
    if (!userName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }

    const updatedUser: User = {
      // id: user?.id,
      username: userName,
      email: email,
      password: password,
      isLoggedIn: true,
    };

    sessionStorage.setItem("user", JSON.stringify(updatedUser));
    // localStorage.setItem("user", JSON.stringify(updatedUser));
    console.log(user, updatedUser);
    console.log("Updated user", user);
    setUser(updatedUser);
    alert("Profile Updated");

  };


const handleDelete = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (window.confirm("Are you sure you want to delete your account?")) {
      // localStorage.removeItem("user");
      sessionStorage.removeItem("user");
      setUser(null);
      alert("Account deleted");
      logout({ logoutParams: { returnTo: window.location.origin } })
  }

  }


  return (
    <div>
      <NavBarHome />
      <h2 className="mt-5 text-white">Settings</h2>
      <h5>Update Profile</h5>
      {isAuthenticated && <div>hi</div>}
      <Form onSubmit={handleUpdate}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextUserName">
          <Form.Label column sm="2">
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
              placeholder="Enter Username"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextEmail">
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="email"
              placeholder="email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextPassword">
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
      <h5 className="mt-5">Delete User Account</h5>
      <Form onSubmit={handleDelete}>
        <Button variant="danger" type="submit">
          Delete
        </Button>
      </Form>
    </div>
  );
};

export default Settings;

