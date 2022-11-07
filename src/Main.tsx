import React, { Component, Fragment } from "react";
import { useEffect, useState, useRef, useCallback } from "react";
import { Link } from "react-router-dom";
import { txt } from "./txt";
import "./Main.css";

import logo from "./logo.svg";
const Main = () => {
  //使用webRTC:
  //创建数据源
  const range = (start: number, end: number) => {
    const result: number[] = [];
    for (let i = start; i <= end; i++) {
      result.push(i);
    }
    return result;
  };
  const video = useRef(null as any); //传入html video模块的数据
  const canvas = useRef(null as any);
  const photo = useRef(null as any);
  let url = useRef(null as unknown as URL);
  // const source=useRef(null as unknown as any)
  const blob = useRef(null as unknown as Blob);
  const media = useRef(null as unknown as MediaStreamTrack);
  const [value, setvalue] = useState("");
  const recoder = useRef(null as unknown as MediaRecorder);
  const [on, seton] = useState(false); //此变量控制开始和暂停录制
  const [dload, setdload] = useState(false); //此变量控制录制视频的下载
  const [src, setSrc] = useState("");
  const [fileName, setFileName] = useState("");
  const success = useCallback((stream: MediaStream) => {
    media.current = stream.getTracks()[0]; //获得第0个轨道的视频流
    recoder.current = new MediaRecorder(stream); //传入视频流进行录制
    video.current.srcObject = stream; //获取视频流，设置视频源为stream
    //触发开始录制事件：使用recorder进行,这里设置不同事件发生时的响应函数
    recoder.current.ondataavailable = (event) => {
      //触发ondataavailable改变的事件,返回Blob类型的数据
      //当触发recoder.stop()事件时触发
      //dataavailable当 MediaRecorder
      //将媒体数据传递到您的应用程序以供使用时，将触发该事件。数据在包含数据的Blob对象中提供。这在四种情况下发生：

      blob.current = new Blob([event.data], { type: "video/webm" }); //更新当前的BLOB数据

      console.log("blob=====", blob.current);
      let url = URL.createObjectURL(blob.current);
      console.log(url);
      // setSrc(url)
    };
    //触发结束录制事件，blob接收开始到结束期间录制的数据。发送数据
    recoder.current.onstop = (event) => {
      // setvalue('停止录制');
      //生成文件

      const file = new File([blob.current], "test.webm", {
        type: "video/webm",
      });
      console.log(file);
      // const post_data={file:['test.mp4',file,'video/mp4']}

      const formData = new FormData();
      formData.append("file", file, "test.webm");
      let res = fetch(
        `http://region-11.autodl.com:14399/${window.history.state.usr.usr}/video`,
        {
          method: "POST",
          body: formData,
          headers: { accept: "application/blob", type: "video/webm" },
        }
      ).then((res) => {
        console.log(window.history.state.usr);
        console.log(res);

        res.headers.forEach((v, k) => {
          if (k === "content-disposition") {
            console.log("xxx");
            setFileName(decodeURIComponent(v.split("'").pop()!).split(".")[0]);
            console.log(decodeURIComponent(v.split("'").pop()!).split(".")[0]);
          }
        });

        res.arrayBuffer().then((buffer) => {
          let blob = new Blob([buffer], {
            type: "video/webm;",
          });
          // console.log(res)
          let url = URL.createObjectURL(blob);
          console.log(url);
          setSrc(url);
          console.log(src);
        });
      });
    };
    recoder.current.start();
  }, []); //
  // //下载视频
  // let url=URL.createObjectURL(blob.current)
  // let linkElement = document.createElement('a') // 创建点击下载的元素,会默认使用
  // linkElement.setAttribute('href', url)
  // linkElement.setAttribute('downLoad','test')//默认下载为mp4，因为源数据就是mp4
  // linkElement.click()
  //初始会返回stream,
  //在这里，我们正在调用MdeiaDevices.getUserMedia()并请求视频流，它返回一个promise，
  //我们给它附加成功和失败情况下的回调方法
  //成功回调接收一个stream对象作为输入，它是新视频video元素的源
  //
  //
  //上传视频：
  useEffect(() => {
    if (value) {
      console.log(`./origin/${value}.mp4`);
      console.log(`./lip-area/${value}.mp4`);
    }
  }, [value]);
  useEffect(() => {
    // console.log(blob)
    if (dload) {
      //启动下载状态
      if (blob.current) {
        //blob不为空
        let url = URL.createObjectURL(blob.current);
        let linkElement = document.createElement("a"); // 创建点击下载的元素,会默认使用
        linkElement.setAttribute("href", url);
        linkElement.setAttribute("downLoad", "test"); //
        linkElement.click();
        setdload(false);
      }
    }
  }, [dload]);
  useEffect(
    () => {
      if (!on) {
        //停止状态
        if (media.current) {
          media.current.stop();
          recoder.current.stop(); //停止录制，并触发recoder.current.onstop事件
        }
        return; //不返回任何结果
      }
      //开启摄像头：
      //获取媒体流：
      //mediaDevices.getUserMedia中既可以在参数中依次输入
      //视频音频的读取条件，成功回调(从摄像头中取得视频流)后
      //会返回一个stream对象，返回失败会得到一个error对象
      //第二，第三两个参数对应于成功回调时执行的操作和失败回调
      //时执行的操作
      //接口提供访问连接媒体输入的设备，如照相机和麦克风，以及屏幕共享等。
      //它可以使你取得任何硬件资源的媒它可以使你取得任何硬件资源的媒体数据。
      //devicechange
      // 返回 devicechange 事件类型的事件处理程序。
      // 也可通过 ondevicechange 访问

      navigator.mediaDevices
        .getUserMedia({
          video: { frameRate: { ideal: 25, max: 25, min: 25 } },
          audio: false,
        })
        .then(success)
        .catch((err) => console.log("An error occured" + err));
    },
    [success, on] //将事件与sucess和on进行绑定,当sucess或者on进行重新渲染
    //的时候执行
  );
  return (
    <>
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <title>主界面</title>
      </head>

      <body>
        <div className="header">
          <div className="logo_Main header_item">
            <img src={logo} style={{ width: "200px", height: "100px" }} />
          </div>

          <div className="header_item" id="snow">
            <div className="select_video">请选择视频：</div>
            <div className="list">
              <select
                name="video"
                style={{ width: "400px", fontSize: "20px" }}
                onChange={(e) => {
                  setvalue(e.target.value);
                }}
              >
                {range(0, 100).map((i) => (
                  <option key={i} value={i || ""}>
                    {txt[i - 1] || "Choose a video"}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="info header_item">
            <p>欢迎，{window.history.state.usr.usr}！</p>
            <button>
              <Link to="/">退出</Link>
            </button>
          </div>
        </div>

        <div className="content wrapper">
          <div className="middle">
            <div className="all_video">
              <video
                controls
                autoPlay
                ref={video}
                width="480"
                height="360"
              ></video>
              <video controls width="480" height="360"></video>
            </div>

            <div className="lip_video">
              <video
                controls
                autoPlay
                src={src}
                width="360"
                height="360"
              ></video>

              <video
                controls
                src={
                  process.env.PUBLIC_URL +
                  `/lip-area/${txt[parseInt(value) - 1] || txt[0]}.webm`
                }
                width="360"
                height="360"
              ></video>
            </div>

            <div className="result">
              <div className="result_1">
                <div className="label">
                  <p>正确文本</p>
                </div>
                <div className="wenbenkuang">
                  {txt[parseInt(value) - 1] || "请选择文件"}
                </div>
              </div>
              <div className="result_2">
                <div className="label">
                  <p>识别结果</p>
                </div>
                <div className="wenbenkuang">{fileName}</div>
              </div>
            </div>
          </div>

          <div className="left">
            <div className="left_item"></div>

            <div className="left_item">
              <button
                className="save"
                style={{ height: "80px", width: "80px" }}
                onClick={() => {
                  setdload(true);
                }}
              >
                下载视频
              </button>
            </div>

            <div className="left_item">
              <button
                className="begin"
                style={{ height: "80px", width: "80px" }}
                onClick={() => {
                  seton(true);
                }}
              >
                开始录制
              </button>
            </div>

            <div className="left_item">
              <button
                className="end"
                style={{ height: "80px", width: "80px" }}
                onClick={() => {
                  seton(false);
                }}
              >
                结束录制
              </button>
            </div>
          </div>

          <div className="right">
            <div className="right_item">
              <button
                className="shouce"
                style={{ height: "80px", width: "40px" }}
              >
                使用手册
              </button>
            </div>

            <div className="right_item">
              <button
                className="fankui"
                style={{ height: "80px", width: "40px" }}
              >
                反馈
              </button>
            </div>
          </div>
        </div>

        <div className="footer">关于我们————金蝉子团队</div>
      </body>
    </>
  );
};
export default Main;
