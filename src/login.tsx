import React from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { NavLink, Link } from "react-router-dom";
import { Navigate } from "react-router-dom";
import { DefaultButton } from "@fluentui/react";
import "./login.css";
import logo from "./logo.svg";
// import {hashHistory} from 'React-router'
// import {browserHistory} from 'react-router'

const Login = () => {
  //确认登陆
  //确认登陆const
  //确认登陆login?username=${username}&password=${password}
  const [loginOn, setLoginOn] = useState(false);
  const [suc, setSuc] = useState(false);
  const [nav, setNav] = useState("/");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // const []
  const route = useRef("");
  useEffect(() => {
    if (loginOn) {
      console.log(loginOn);
      setSuc(true);
    }
  }, [loginOn, setLoginOn]);

  useEffect(() => {
    if (suc) {
      //成功验证，进行跳转
      console.log("right");
      setNav("/Main");
      setSuc(false);
    }
  }, [suc, setSuc]);

  return (
    <>
      <head>
        <meta httpEquiv="X-UA-Compatible" content="IE=edge"></meta>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1.0"
        ></meta>
        <title>登陆界面</title>
      </head>
      <body>
        <div className="container">
          <div className="logo">
            <img src={logo} alt="logo" />
          </div>
          <div className="login-form">
            <form action="">
              <h2>登录</h2>
              <input
                type="text"
                name="username"
                placeholder="用户名"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
              ></input>
              <input
                type="password"
                name="password"
                placeholder="密码"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
              ></input>

              <button type="submit" id="btn">
                <Link to={"/register"} state={{ usr: username }}>
                  新用户?点此注册
                </Link>
              </button>

              <br />
              <button
                type="submit"
                id="btn"
                onClick={() => {
                  setLoginOn(true);
                }}
              >
                <Link to={nav} state={{ usr: username }}>
                  登录
                </Link>
              </button>
            </form>
          </div>
        </div>
      </body>
    </>
  );
};
export default Login;
