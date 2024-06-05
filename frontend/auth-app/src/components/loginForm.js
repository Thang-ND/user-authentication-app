import React from 'react';
import { Link } from 'react-router-dom';
import { useRef, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { BASE_API_URL } from '../constants/Constants';

import clsx from 'clsx';
import styles from './CSS/LoginFormCSS.module.scss';
import logoImage from '../assets/logo-design.png';

import axios from '../config/axios';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import TokenService from '../service/TokenService';
import RoleService from '../service/RoleService';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function LoginForm(props) {
  const navigate = useNavigate();
  const role = props.role;



  const [open, setOpen] = useState(false);

  const LOGIN_URL = BASE_API_URL + `/token`;
  const [accessToken, setAccessToken] = useState(null);
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [pwd, setPwd] = useState('');
  const [errMsg, setErrMsg] = useState('');
  const [success, setSuccess] = useState(false);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  useEffect(() => {
    if (TokenService.getLocalAccessToken(role)) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
  }, [accessToken]);

  useEffect(() => {
    if (success === true) {
      navigate('/user/information');
    }
  }, [success]);

  useEffect(() => {
    setErrMsg('');
  }, [user, pwd]);

  useEffect(() => {
    if (TokenService.getLocalAccessToken(role)) {
      setSuccess(true);
    } else {
      setSuccess(false);
    }
    let r = '';
    if (role === 'customer') {
      r = 'khách hàng';
    }

    setErrMsg(`Bạn đang đăng nhập với vai trò ${r}`);
  }, [role]);

  useEffect(() => {
    if (errMsg !== '') setOpen(true);
  }, [errMsg]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let response;

      const formData = new URLSearchParams();
      formData.append('username', user);
      formData.append('password', pwd);
      formData.append('scope', '');
      formData.append('client_id', '');
      formData.append('client_secret', '');

      response = await axios.post(
        LOGIN_URL,
        formData, {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'accept': 'application/json'
          }
        });

      const msg = "123";

      const token = response?.data?.access_token;


        TokenService.setLocalAccessToken(role, token);
        RoleService.setLocalRole(role);
        setAccessToken(token);
        setUser('');
        setPwd('');
    } catch (err) {
      const msg = err?.response?.data?.detail

      if (msg) {
        setErrMsg(msg);
        setOpen(true);
      } else {
        setErrMsg('Incorrect email or password');
        setOpen(true);
      }
      errRef.current.focus();
    }
  };

  return TokenService.getLocalAccessToken(role) || success ? (
    <div className={clsx(styles.loginContainer, styles.row)}></div>
  ) : (
    <div className={clsx(styles.loginContainer, styles.row)}>
      <div
        ref={errRef}
        className={
          errMsg
            ? clsx(styles.snackbar, styles.show)
            : clsx(styles.snackbar, styles.offscreen)
        }
        aria-live="assertive"
      >
        <Snackbar open={open} autoHideDuration={2000} onClose={handleClose}>
          <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
            {errMsg}
          </Alert>
        </Snackbar>
      </div>

      <div className={clsx(styles.loginLogo, styles.col)}>
        <div className={clsx(styles.imgContainer)}>
          <img className={styles.logo} src={logoImage} alt="logo" />
        </div>
        <span className={clsx(styles.logoTitle)}>
          <h1 className={styles.title}>
          Simple Authentication Application
          </h1>
        </span>
      </div>

      <div className={clsx(styles.col, styles.loginForm)}>
        <form className={clsx(styles.row)} onSubmit={handleSubmit}>
          <div className={clsx(styles.formTitle, styles.row)}>
            <h2 className={clsx(styles.title)}> Login </h2>
          </div>
          <div className={clsx(styles.formField, styles.row)}>
            <label
              htmlFor="email"
              className={clsx(styles.formLabel, styles.row)}
            >
              Email
            </label>
            <input
              id="email"
              ref={userRef}
              autoComplete="off"
              onChange={(e) => setUser(e.target.value)}
              value={user}
              type="text"
              className={clsx(styles.formInput, styles.row)}
              required
            />
          </div>
          <div className={clsx(styles.formField, styles.row)}>
            <label
              htmlFor="password"
              className={clsx(styles.formLabel, styles.row)}
            >
              Password:
            </label>
            <input
              id="password"
              autoComplete="off"
              onChange={(e) => setPwd(e.target.value)}
              value={pwd}
              type="password"
              className={clsx(styles.formInput, styles.row)}
              required
            />
          </div>
          <button
            value="Submit"
            type="submit"
            className={clsx(styles.row, styles.btn, styles.primary)}
          >
            Log in
          </button>
        </form>

        { (
          <div className={clsx(styles.formFooter, styles.row)}>
            {props.role === 'customer' && (
              <span>
                Not a member?{' '}
                <Link to="/register" className={clsx(styles.col)}>
                  Sign up
                </Link>{' '}
                now.
              </span>
            )}

          </div>
        )}
      </div>
    </div>
  );
}

export default LoginForm;
