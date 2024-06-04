import React, { useEffect, useState } from "react";
// import "react-datepicker/dist/react-datepicker.css";
import styles from './CSS/AccountInformation.module.css'
import clsx from "clsx";
import {updateCustomerProfile, getCustomerProfile} from '../service/CustomerService.js';
import { updateAdminPassword } from "../service/AdminService.js";
import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
function AccountInformation(props){
    const role = props.role;

    const [currentUser, setCurrentUser] = useState({username:'Mr.A', email:'mra@gmail.com'});
    useEffect(() => {
        // if(role!=='admin'){
        //     getCustomerProfile().then(res=>{setCurrentUser(res?.data?.data)})
        // }
    },[props])
    const displayUpdate = (id)=>{
        const res = document.getElementById(id)
        if (res.style.display === 'flex'){
            res.style.display = 'none'
        }
        else{
            res.style.display = 'flex'
        }
    }
    
    return (
        <div className={styles.container}>
            <h2>User Infomation</h2>
            <div className={styles.content}>
                <div className={styles.group}>
                    <div className={styles.infor}>
                        <label className={styles.column}>Username</label>
                        <label className={styles.midColumn}>{currentUser?.username}</label>
                        <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                            
                        ></label>
                    </div>
                </div>

                <div className={styles.group}>
                    <div className={styles.infor}>
                        <label className={styles.column}>Email</label>
                        <label className={styles.midColumn}>{currentUser?.email}</label>
                        <label className={clsx(styles.lastColumn,styles.replaceInfor)}
                            
                        ></label>
                    </div>
                </div>
                
                </div>
            <ToastContainer />

            
        </div>
    )

}
export default AccountInformation