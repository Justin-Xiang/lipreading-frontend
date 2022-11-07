import { useEffect, useState, useRef, useCallback } from "react";
import "./App.css";
import axios from "axios";
import {
  Route,
  BrowserRouter,
  Routes,
  Link,
  Navigate,
  HashRouter,
} from "react-router-dom";
import Main from "./Main";
import Register from "./register";
import Login from "./login";
import Test from "./Test";

import UserInfo from "./UserInfo";
// <Route path='/' ></Route>
//   <Route path='/register' ></Route>
//   <Route path='/login'></Route>

const Page = () => {
  return (
    <>
      <head>
        <meta
          name="viewport"
          content="initial-scale=1.0, maximum-scale=1.0, user-scalable=no"
        />
        <title>弹窗界面</title>
        <link rel="stylesheet" href="#" />
      </head>
      <body>
        <h1>“金蝉子”辅助训练系统用户隐私声明</h1>
        <h2>
          用户您好！欢迎使用本辅助训练系统，在使用前，请认真阅读本《“金蝉子”辅助训练系统用户隐私声明》（以下简称“《隐私声明》”），在同意本《隐私声明》后，方可使用本产品。
        </h2>
        <h3>用户数据收集</h3>
        <h4>
          在您使用本产品的过程中，我们会收集您的数据，主要包含以下几方面的数据：
        </h4>
        <h4>
          1）您个人的注册账户信息，包括但不限于您注册时所提供的用户名、密码、联系邮箱、年龄等数据信息。
        </h4>
        <h4>
          2）您在使用本产品的过程中产生的信息及数据，包括但不限于唇读训练的视频数据、个人面部数据等数据信息。
        </h4>
        <h3>数据收集说明</h3>
        <h4>
          我们将严格保管您的个人信息，并保证您的个人隐私不会遭到泄露。我们所收集的用户数据将仅用于科研所用，且会对相关隐私数据进行脱敏处理。
        </h4>

        <button>
          {" "}
          <Link to="/">确认</Link>
        </button>
        <div className="zhezhao" id="zhezhao" />
      </body>
    </>
  );
};

const App = () => {
  return (
    <HashRouter>
      <div className="APP">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/Main" element={<Main />} />
          <Route path="/page" element={<Page />} />
          <Route path="/UserInfo" element={<UserInfo />} />
        </Routes>
      </div>
    </HashRouter>
  );
};

export default App;
