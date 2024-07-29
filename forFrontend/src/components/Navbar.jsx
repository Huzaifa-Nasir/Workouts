import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';
import { Avatar,Wrap,WrapItem  } from '@chakra-ui/react'
import useLogout from '../hooks/useLogout';
import useAuthContext from '../hooks/useAuthContext';
 '../hooks/useLogout';
const Navbar = () => {
  const {user} = useAuthContext();
  const {LogoutUser} = useLogout()
  const LoggingOut = ()=>{
    LogoutUser();
  }
  console.log('User data:', user);
  return (
    <nav>
      
      <Wrap>
  <WrapItem>
    <Avatar size='xl' name='Dan Abrahmov' src='../pictures/myGym.jpg' />
  </WrapItem>
  </Wrap> 
 
   <div className='navBut'>
   {user ? ( <div className='btnLogout'>
          <span className='email'>{user.email}</span>
         {console.log(user.email)}
         <button  onClick={LoggingOut}>Logout</button>
        </div>) 
      
       :( <div className='navBTN'>
        <Link to="/">Home</Link>
        <Link to="/signup">Sign Up</Link>
        <Link to="/login">Log In</Link>
        </div>)
       }
      </div>
    </nav>
  );
};

export default Navbar;
