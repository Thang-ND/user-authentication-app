import React, { useEffect, useState } from "react";
import styles from './CSS/AccountInformation.module.css'
import clsx from "clsx";
import { ToastContainer, toast } from 'react-toastify';
import axios from '../config/axios';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from "../constants/Constants";
import TokenService from "../service/TokenService";

function AccountInformation(props){
    const role = props.role;
    const navigator = useNavigate();
    let alertShown = false;

    

    const [currentUser, setCurrentUser] = useState();
    const USER_INFORMATION_URL = BASE_API_URL + `/users/get-info-current-user`;

    useEffect(() => {
        getCustomerInfo()
    },[])


    const getCustomerInfo = async () => {
        const token =  TokenService.getLocalAccessToken(role);
        try {
            const response = await axios.get(
                USER_INFORMATION_URL,
               {
                headers: {
                    "Content-Type": "application/json",
                    'accept': 'application/json',
                    "Authorization" : "Bearer " + token
                }
              });
      
            const data = response?.data
            setCurrentUser({username:data?.username, email:data?.email})
            
        } catch (err) {
            const status = err?.response?.status

            if (status === 401 && !alertShown) {
                alertShown = true; // Set the flag to true
                TokenService.removeLocalAccessToken(role)
                alert('Token is invalid. Please login again!');
                navigator('/login');
            }           
        }   

    }
    
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