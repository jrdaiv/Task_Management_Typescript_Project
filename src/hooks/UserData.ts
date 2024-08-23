import React from 'react';
import axios from 'axios';
import { User } from '../context/UserContext';




export const fetchAllUsers = async (): Promise<User[]> => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/users`);
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch users");
    }
  } 


  export const fetchUser = async (id: number): Promise<User> => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/users/${id}`);
      sessionStorage.setItem("user", JSON.stringify(response.data));
      return response.data;
    } catch (error) {
      throw new Error("Failed to fetch user");
    }
  } 
