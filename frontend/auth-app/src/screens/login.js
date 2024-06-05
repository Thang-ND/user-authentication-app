import LoginForm from '../components/loginForm';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { Navigate } from 'react-router-dom';

function Login(navigation, role) {
  const accessToken = TokenService.getLocalAccessToken(
    RoleService.getLocalRole()
  );
  if (accessToken) {
    if (RoleService.getLocalRole() === 'customer') {
      return <Navigate to="/"></Navigate>;
    }
  } else {
    return (
      <div className="Login">
        <LoginForm role={navigation.role} />
      </div>
    );
  }
}

export default Login;
