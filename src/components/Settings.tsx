import axios  from "axios";
import React, { useState, useContext, FormEvent } from "react";
import { Form, Row, Col, Button, Spinner } from "react-bootstrap";
// import UserContext from "../context/UserContext";
import '../App.css'
import NavBarHome from "./NavBarHome";
import { useAuth0 } from "@auth0/auth0-react";


// interface User{
//   id: string,
//   userName: string,
//   email: string,
//   password?: string,
//   cart?: any[],
//   isLoggedIn: boolean,
//   token?: string,

// }
// interface UserContextType{
//   user: User | null,
//   setUser: React.Dispatch<React.SetStateAction<User | null>>

// }



const Settings: React.FC = () => {
  // const { user } = useContext(UserContext);
  const { user, isAuthenticated, isLoading } = useAuth0();
  const [userName, setUserName] = useState<string>(user?.userName || "");
  const [email, setEmail] = useState<string>(user?.email || "");
  const [password, setPassword] = useState<string>('');

    if(isLoading) {
      return <Spinner animation="border" variant="primary" />
  }


  const deleteUser = async (event: FormEvent) => {
    event.preventDefault();
    if (window.confirm('Are you sure you want to delete your account?')) {
        try {
            const response = await axios.delete(
              `https://fakestoreapi.com/users/${user?.id}`
            );
            sessionStorage.removeItem('user');
            console.log(response.data);
            // console.log("Deleted User",sessionStorage.removeItem('user'));
            alert("Profile Deleted");
          } catch (error) {
            console.error(error);
            alert("Profile Delete Failed");
          }

        }
  };


  const handleUpdate = async (event: FormEvent) => {
    event.preventDefault();
    if (isAuthenticated) {
      console.log(user);
    console.log(userName, email, password);
    if (!userName || !email || !password) {
      alert("Please fill in all fields");
      return;
    }
    try {
      const response = await axios.put(
        `https://fakestoreapi.com/users/${user?.id}`,
        {
          username: userName,
          email: email,
          password: password,
        }
      );
      sessionStorage.setItem('user', JSON.stringify(response.data));
      // setUser(response.data)
      console.log(response.data);
      alert("Profile Updated");
    } catch (error) {
      console.error(error);
      alert("Profile Update Failed");
    }
    }else{
      console.log(isAuthenticated)
    }

  };



  return (
    <div>
      <NavBarHome />
      <h2 className="mt-5 text-white">Settings</h2>
      <h5>Update Profile</h5>
      {isAuthenticated && <div>hi</div>}
      <Form onSubmit={handleUpdate}>
        <Form.Group as={Row} className="mb-3"  controlId="formPlaintextUserName" >
          <Form.Label column sm="2">
            Username
          </Form.Label>
          <Col sm="10">
            <Form.Control type="text" placeholder="Enter Username" value={userName} onChange={(e) => setUserName(e.target.value)}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3"  controlId="formPlaintextEmail" >
          <Form.Label column sm="2">
            Email
          </Form.Label>
          <Col sm="10">
            <Form.Control type="email" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)}/>
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-3"  controlId="formPlaintextPassword" >
          <Form.Label column sm="2">
            Password
          </Form.Label>
          <Col sm="10">
            <Form.Control type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
          </Col>
        </Form.Group>
        <Button variant="primary" type="submit">
          Update
        </Button>
      </Form>
      <h5 className="mt-5 ">Delete User Account</h5>
      <Form onSubmit={deleteUser}>
        <Button variant="danger" type="submit">
          Delete
        </Button>
      </Form>
    </div>
  );
};

export default Settings;
