// import React, { useState } from 'react';
// import {
//   Navbar,
//   Typography,
//   Button,
//   IconButton,
//   Collapse,
// } from '@material-tailwind/react';
// import { useAuth0 } from '@auth0/auth0-react';

// const NavBar: React.FC = () => {
//   const { logout, isAuthenticated, user } = useAuth0(); // Auth0 hooks
//   const [openNav, setOpenNav] = useState(false); // For responsive menu

//   const handleLogout = () => {
//     logout({ logoutParams: { returnTo: window.location.origin } });
//   };

//   return (
//     <Navbar className="mx-auto max-w-screen-xl px-4 py-2 bg-black shadow-md"  placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//       <div className="container mx-auto flex items-center justify-between">
//         {/* E-Commerce Title */}
//         <Typography as="a" href="/" variant="h5" className="cursor-pointer text-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//           E-Commerce
//         </Typography>

//         {/* Desktop Links */}
//         <div className="hidden lg:flex items-center space-x-6">
//           <Typography as="a" href="/products" className="text-gray-800 hover:text-gray-600" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//             Products
//           </Typography>
//           <Button variant="text" size="sm" color="gray" className="flex items-center" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//             <span>Cart</span>
//           </Button>
//           {isAuthenticated ? (
//             <div className="flex items-center space-x-4">
//               <Typography className="text-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Hello, {user?.name}</Typography>
//               <Button variant="gradient" size="sm" onClick={handleLogout} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//                 Logout
//               </Button>
//             </div>
//           ) : (
//             <Button variant="text" size="sm" color="gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//               Login
//             </Button>
//           )}
//         </div>

//         {/* Mobile Menu Icon */}
//         <IconButton
//                   variant="text"
//                   className="ml-auto h-6 w-6 text-gray-800 lg:hidden"
//                   onClick={() => setOpenNav(!openNav)} children={undefined} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}        >
//         </IconButton>
//       </div>

//       {/* Mobile Links */}
//       <Collapse open={openNav}>
//         <div className="flex flex-col space-y-2 lg:hidden mt-4">
//           <a href="/products" className="text-gray-800 hover:text-gray-600">
//             Products
//           </a>
//           <a href="/cart" className="text-gray-800 hover:text-gray-600">
//             Cart
//           </a>
//           {isAuthenticated ? (
//             <>
//               <Typography className="text-gray-800" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>Hello, {user?.name}</Typography>
//               <Button variant="gradient" size="sm" onClick={handleLogout} placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//                 Logout
//               </Button>
//             </>
//           ) : (
//             <Button variant="text" size="sm" color="gray" placeholder={undefined} onPointerEnterCapture={undefined} onPointerLeaveCapture={undefined}>
//               Login
//             </Button>
//           )}
//         </div>
//       </Collapse>
//     </Navbar>
//   );
// };

// export default NavBar;
