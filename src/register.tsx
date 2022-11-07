import React from "react";
import { Form, Input, Button } from "antd";
import { useEffect, useState, useRef, useCallback } from "react";
import axios from "axios";
import "./register.css";
import logo from "./logo.svg";
import { Link, NavLink } from "react-router-dom";
const Register = () => {
  const [name, set_name] = useState("");
  const [suc, set_suc] = useState(false);
  const [nav, set_nav] = useState("/register");
  const [password, set_password] = useState("");
  const [RegOn, set_RegOn] = useState(false);
  useEffect(() => {
    if (RegOn) {
      //判断按钮是否按下
      set_suc(true);
    }
  }, [RegOn, set_RegOn, name, password, set_suc]);
  useEffect(() => {
    if (suc) {
      //成功验证，进行跳转
      alert("注册成功");
      console.log("right");
      set_nav("/Page");
      console.log(nav);
      set_suc(false);
      set_RegOn(false);
    } else {
      // set_nav('/');
      if (RegOn) {
        alert("该用户已被注册");
        set_nav("/");
        set_RegOn(false);
      }
    }
  }, [suc, set_suc, nav, set_nav]);
  return (
    <>
      <head>
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="register.css" />
        <title>注册界面</title>
      </head>
      <body>
        <div className="container">
          <div className="logo">
            <img src={logo} />
          </div>
          <div className="login-form">
            <form action="#">
              <h2>注册</h2>
              <input
                type="text"
                name="username"
                placeholder="请输入您的姓名"
                onChange={(e) => {
                  set_name(e.target.value);
                }}
              />
              <input type="text" name="phone" placeholder="请输入您的手机号" />
              <input
                type="password"
                name="password"
                placeholder="请输入您的密码"
                onChange={(e) => {
                  set_password(e.target.value);
                }}
              />
              <div className="item">
                您的性别:
                <label className="radio-item">
                  <input type="radio" name="sex" value="male" />
                  <span className="radio"></span>
                  <span>男</span>
                </label>
                <label className="radio-item">
                  <input type="radio" name="sex" value="female" />
                  <span className="radio"></span>
                  <span>女</span>
                </label>
              </div>
              <div className="item">
                是否有听力补偿设备:
                <label className="radio-item">
                  <input type="radio" name="equip" value="true" />
                  <span className="radio"></span>
                  <span>是</span>
                </label>
                <label className="radio-item">
                  <input type="radio" name="equip" value="false" />
                  <span className="radio"></span>
                  <span>否</span>
                </label>
              </div>

              <button
                type="submit"
                onClick={() => {
                  set_RegOn(true);
                }}
              >
                <NavLink to={nav}>确认注册</NavLink>
              </button>
              <div className="signUp">
                <a href="/">登录账号</a>
              </div>
            </form>
          </div>
        </div>
      </body>
    </>
  );
};
export default Register;
