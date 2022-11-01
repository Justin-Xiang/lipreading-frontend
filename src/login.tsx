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
  const [loginOn, set_loginOn] = useState(false);
  const [suc, set_suc] = useState(false);
  const [nav, set_nav] = useState("/");
  const [username, set_username] = useState("");
  const [password, set_password] = useState("");

  // const []
  const route = useRef("");
  useEffect(() => {
    // let username='zhsy1234'
    // let password='123456'
    // console.log(loginOn);
    if (loginOn) {
      //判断按钮是否按下
      //         let res=fetch(`http://region-11.autodl.com:14399/login?name=${username}&password=${password}`,
      // {method:'POST', headers:{accept:'application/json'}}).then((res)=>{res.json().then((data)=>{
      //   if(typeof(data.success)=='undefined'){set_suc(false);
      //     console.log(data)}else{set_suc(true);console.log(data.success)}
      // })})
      // .catch((e)=>{console.log(e)});
      //   let res=fetch('http://region-11.autodl.com:14399/login',
      // {method:'POST',body:JSON.stringify({'username':'zhsy','password':'123456'})}).then((res)=>{console.log(res.status);console.log('ggg')});
      // route.current='/'
      set_suc(true);
      
      // set_loginOn(false);
    }
  }, [loginOn, set_loginOn]);
  useEffect(() => {
    if (suc) {
      //成功验证，进行跳转
      alert("成功验证");
      console.log("right");
      set_nav("/Main");
      set_suc(false);
    }
  }, [suc, set_suc]);

  // {* <button type="submit" id="btn" onClick={()=>{set_loginOn(true)}}><></></button> *}
  // <Link to='/Main'>确认登陆</Link>
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
            <img src={logo} />
          </div>
          <div className="login-form">
            <form action="#">
              <h2>登录</h2>
              <input
                type="text"
                name="username"
                placeholder="用户名"
                onChange={(e) => {
                  set_username(e.target.value);
                }}
              ></input>
              <input
                type="password"
                name="password"
                placeholder="密码"
                onChange={(e) => {
                  set_password(e.target.value);
                }}
              ></input>

              <div className="signUp">
                <a href="/register">注册账号</a>
              </div>
              {/*<button><Link to="/UserInfo">用户信息</Link></button>*/}

              <button
                type="submit"
                id="btn"
                onClick={() => {
                  set_loginOn(true);
                }}
              >
                <Link to={nav} state={{ usr: username }}>
                  确认登陆
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
