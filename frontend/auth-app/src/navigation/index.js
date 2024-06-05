import { Routes, Route, Link } from 'react-router-dom';
import Login from '../screens/login';
import Register from '../screens/register';
import UserInformation from '../screens/userInformation1';

function RootRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Login role="customer" />} />
      <Route path="/login" element={<Login role="customer" />} />
      <Route path="/register" element={<Register role="customer" />} />

      <Route
        path="/user/information"
        element={<UserInformation role="customer" />}
      />    
    </Routes>
  );
}

export default RootRoutes;
