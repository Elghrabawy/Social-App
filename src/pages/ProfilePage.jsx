import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation
import { Avatar, Button } from '@heroui/react'; // Assuming you're using @heroui/react for UI components
import { authContext } from '../contexts/AuthContext';

export default function ProfilePage() {
  const navigate = useNavigate(); // Initialize the navigate function

  return (<>Profile Page</>
  );
}