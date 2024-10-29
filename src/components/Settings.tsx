import React, { useState, useContext, FormEvent, useEffect } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import NavBar from "./NavBar";
import { useAuth0 } from "@auth0/auth0-react";
import UserContext, { User } from "../context/UserContext";
import { fetchAllUsers, fetchUser } from "../hooks/UserData";
import { useNavigate } from "react-router-dom";



const Settings: React.FC = () => {
  const { isAuthenticated, user: auth0User, isLoading: authLoading, logout } = useAuth0();
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  const [users, setUsers] = useState<User[]>([]);
  const [userName, setUserName] = useState<string>('');
  const [userEmail, setUserEmail] = useState<string>('');
  const [userPassword, setUserPassword] = useState<string>('');

  
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      setUserEmail(user.email || '');
      setUserName(user.username || '');
      setUserPassword(user.password || '');
    }
    
  }, [user])

  const handleUserUpdate = async (event: FormEvent) => {
    event.preventDefault();
    if (user) {
      setLoading(true)
      try {
        const updatedUser = {...user, username: userName, email: userEmail, password: userPassword };
        console.log("Updating user:", user);
        const response = await axios.put(`https://fakestoreapi.com/users/1`, updatedUser);
        setUser(response.data);
        localStorage.setItem("user", JSON.stringify(response.data));
        sessionStorage.setItem("user", JSON.stringify(response.data));
        console.log("User updated successfully:", response.data);
        alert("User Updated Successfully");
      } catch (error) {
        alert("Failed to Update User");
      }finally {
        setLoading(false)
        
      }
    }
  };

  const handleDelete = async () => {
    if (user) {
      try {
        console.log("Deleting user with ID:", user.id);
        await axios.delete(`https://fakestoreapi.com/users/1`);
        console.log("User deleted successfully");
        alert("User Deleted Successfully");
        sessionStorage.removeItem("user");
        localStorage.removeItem("user");
        setUser(null);
        logout({ logoutParams: { returnTo: window.location.origin } })
      } catch (error) {
        alert("Failed to Delete User");
      }
    }
  };

  const handleUserDelete = (event: FormEvent) => {
    event.preventDefault();
    const userConfirmation = window.confirm("Are you sure you want to delete your account?");
    if (userConfirmation) {
      handleDelete();

    } 
  };

  if (loading || authLoading) {
    return <Spinner animation="border" variant="primary" />;
  }
  if (error) {
    return <div>Error: {error}</div>;
  }
  if (!user) {
    return <div>User not found</div>;
  }

  return (
    <div>
      <NavBar />
      <h2 className="mt-5 text-white">Settings</h2>
      <h5>Update Profile</h5>
      <Form onSubmit={handleUserUpdate}>
        <Form.Group as={Row} className="mb-3" controlId="formPlaintextUserName">
          <Form.Label column sm="2">
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control
              type="text"
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
              type="text"
              value={userEmail}
              onChange={(e) => setUserEmail(e.target.value)}
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
              value={userPassword}
              onChange={(e) => setUserPassword(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
      <h5 className="mt-5">Delete User Account</h5>
      <Button variant="danger" onClick={handleUserDelete}>
        Delete
      </Button>
    </div>
  );
};

export default React.memo(Settings);
