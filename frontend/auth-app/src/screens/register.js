
import RegisterForm from '../components/registerForm';
import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';
import { Navigate } from 'react-router-dom';

function Register(navigation, role) {
  //console.log(role);
  const accessToken = TokenService.getLocalAccessToken(
    RoleService.getLocalRole()
  );
  
  return (
    <div className="Register">
      <RegisterForm role={navigation.role} />
    </div>
  );
}
export default Register;
