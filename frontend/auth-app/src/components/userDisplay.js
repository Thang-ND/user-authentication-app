import React, { useEffect, useState } from "react";
import styles from './CSS/UserDisplay.module.css'


function UserDisplay(props){
    const role = props.role;
    const user_url = props.user_url
    const [userUrl, setUserUrl] = useState()
    const [file, setFile] = useState();
    useEffect(() => {
        setUserUrl(user_url)
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
    const updateAvatar = () => {
        
    }
    return (
        <div className={styles.container}>
            <h2 className={styles.title}>My Account</h2>
            <div className={styles.content}>
                <div className={styles.left_cpn}>
                    <img src={userUrl} className={styles.user_avatar} />
                    {role === 'customer' &&
                    <div className={styles.changeAvatar}>

                        <label className={styles.replaceInfor}
                                onClick={()=>displayUpdate(1)}
                            >Thay đổi</label>

                        <div className={styles.update} id={1}>
                            <input class="form-control" type="file" id="formFile" name="formFile" onChange={(e) => setFile(e.target.files[0])}/>
                            <lable className={styles.replaceInfor} onClick={updateAvatar}>Save</lable>
                        </div>
                    </div>
                    }
                </div>

            </div>



        </div>
    )

}
export default UserDisplay;