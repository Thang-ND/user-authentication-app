import React, { useEffect, useState, useLayoutEffect, memo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import clsx from 'clsx';
import styles from './CSS/RegisterFormCSS.module.scss';
import axios from '../config/axios';
import { BASE_API_URL } from '../constants/Constants';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import TokenService from '../service/TokenService';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});


function RegisterForm(props) {
  const role = props.role;
  const navigate = useNavigate();

  useEffect(() => {
    if (TokenService.getLocalAccessToken(role)) {
      if (role === 'customer') {
        navigate('/');
      }
    }
  }, []);

  const [username, setUser] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errMsg, setErrMsg] = useState('');

  const [open, setOpen] = useState(false);

  const [success, setSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setErrMsg('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const REGISTER_URL = BASE_API_URL + `/users`;
      if (password !== confirmPassword) {
        setErrMsg('Mật khẩu không khớp!');
      } else {
        if (password.length < 6) {
          setErrMsg('Mật khẩu phải chứa ít nhất 6 kí tự!');
        } else {
          if (errMsg === '') {
            let data = {};
            data = {
              username: username,
              email: email,
              password: password,
            };
            try {
              const response = await axios.post(REGISTER_URL, JSON.stringify(data), {
                headers: {
                  'Content-Type': 'application/json',
                },
              });

              setSuccess(true);
            } catch (err) {
              console.log(err)
              const msg = err?.response?.data?.detail

              if (msg) {
                setErrMsg(msg);
                setOpen(true);
              } else {
                setErrMsg('Đăng kí thất bại.');
                setOpen(true);
              }
            }
          }
        }
      }
    
  };

  useEffect(() => {
    if (errMsg !== '') {
      setOpen(true);
    }
  }, [errMsg]);

  if (success) {
    return (
      <div className={clsx(styles.registerContainer, styles.success)}>
        <div>
            Bạn đã đăng kí thành công, vui lòng chuyển đến trang{' '}
            <Link to={'/login'}> đăng nhập </Link>
          </div>
      </div>
    );
  } else {
    return (
      <div className={clsx(styles.registerContainer, styles.row)}>
        <div
          className={
            errMsg
              ? clsx(styles.snackbar, styles.show)
              : clsx(styles.snackbar, styles.offscreen)
          }
          aria-live="assertive"
        >
          <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity="error"
              sx={{ width: '100%' }}
            >
              {errMsg}
            </Alert>
          </Snackbar>
        </div>
        <div className={clsx(styles.registerForm)}>
          <form onSubmit={handleSubmit} className={clsx(styles.row)}>
          <div className={clsx(styles.formTitle, styles.row)}>
                <h2 className={clsx(styles.title)}> Sign Up </h2>
              </div>
            <div className={clsx(styles.row, styles.formRow)}>
              <div className={clsx(styles.formLeft)}>
                <div className={clsx(styles.formRow, styles.row)}>
                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      for="username"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Username:
                    </label>
                    <input
                      id="username"
                      name="username"
                      value={username}
                      onChange={(e) => setUser(e.target.value)}
                      type="text"
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Username..."
                      required
                    />
                  </div>                  

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="email"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Email:
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Email..."
                      required
                    />
                  </div>
                </div>             
             

                <div className={clsx(styles.formRow, styles.row)}>


                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="password"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Password:
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      onChange={(e) => setPassword(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Password..."
                      required
                    />
                  </div>

                  <div className={clsx(styles.formField, styles.col3)}>
                    <label
                      htmlFor="confirmPassword"
                      className={clsx(styles.formLabel, styles.row)}
                    >
                      Confirm Password:
                    </label>
                    <input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className={clsx(styles.formInput, styles.row)}
                      placeholder="Confirm Password..."
                      required
                    />
                  </div>
                </div>
              </div>

            </div>
            <div className={clsx(styles.formRow, styles.formFooter)}>

              <div className={clsx(styles.btnContainer)}>
                <button
                  value="Submit"
                  type="submit"
                  className={clsx(styles.btn, styles.primary)}
                >
                  SIGN UP
                </button>
                <button
                  onClick={() => {
                    navigate('/login');
                  }}
                  className={clsx(styles.btn, styles.cancel)}
                >
                  CANCEL
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

export default memo(RegisterForm);
