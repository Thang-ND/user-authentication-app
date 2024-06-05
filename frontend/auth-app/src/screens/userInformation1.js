import styles from '../components/CSS/UserInformation.module.css';
import AccountInformation from '../components/accountInformation1.js';


function UserInformation(navigation, role) {


  return (
    <div className={styles.container}>

      
      <div className={styles.content}>

        <AccountInformation role={navigation.role} />
        <div className={styles.wrapLogout}>
        </div>
      </div>
    </div>
  );
}
export default UserInformation;
