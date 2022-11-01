import './UserInfo.css'
import {useEffect,useState,useRef,useCallback} from 'react'

const UserInfo=()=>{
      const [fig,setfig]=useState(null as any);
      // const



  return(
    <>
    <head>
        <title>UserInfo</title>
    </head>
    <body>
        <div className="Content-Main">
            <form  action="" method="post" className="form-userInfo">
                <h1>个人信息</h1>
                <span className="text1">请在文本框中完善您的个人信息：</span>
                <div className="fileInputContainer">
                    <input className="fileInput" id="" type="file" name="" />
                </div>

                <label>
                    <span>姓名:</span>
                    <input type="text"  name="name" placeholder="Your Full Name"/>
                </label>
                <label className="Main-sex">
                    <span>性别:</span>
                    <input type="checkbox" className="man"/>男
                    <input type="checkbox" className="women"/>女
                </label>
                <label>
                    <span>邮箱 :</span>
                    <input type="email" name="email" placeholder="@.com"/>
                </label>
                <label>
                    <span>手机号:</span>
                    <input type="text" name="phone" placeholder="Please input 11 number"/>
                </label>
                <label>
                    <span>签名:</span>
                    <textarea id="message" name="message" placeholder="Your message to us"></textarea>
                </label>
                <label>
                    <input type="button" className="button" value="提交"/>
                </label>
            </form>
        </div>
</body>
</>
  )
}

export default UserInfo
