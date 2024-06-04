import { Routes, Route, Link } from 'react-router-dom';
import Login from '../screens/login';
import Register from '../screens/register';
import UserInformation from '../screens/UserInformation';

function RootRoutes() {
  return (
    <Routes>

      <Route path="/login" element={<Login role="customer" />} />
      <Route path="/register" element={<Register role="customer" />} />

      <Route
        path="/user/infomation"
        element={<UserInformation role="user" />}
      />

      {/* <Route path="/shopper/login" element={<Login role="shopper" />} /> */}
      {/* <Route path="/admin/login" element={<Login role="admin" />} /> */}


      
    </Routes>
  );
}

export default RootRoutes;
