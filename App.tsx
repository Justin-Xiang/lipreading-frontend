import React from 'react';
import logo from './logo.svg';
import {useEffect,useState,useRef,useCallback} from 'react'
import './App.css';
function Counter() {
  //使用webRTC:
  //创建数据源
  const video=useRef(null as any)//传入html video模块的数据
  const canvas=useRef(null as any)
  const photo=useRef(null as any)
  let url=useRef(null as unknown as URL)
  const blob = useRef(null as unknown as Blob);
	const media = useRef(null as unknown as MediaStreamTrack);
  const [value,setvalue]=useState('等待开启摄像头')
  const recoder=useRef(null as unknown as MediaRecorder)
  const [on,seton]=useState(false)//此变量控制开始和暂停录制
  const [src, setSrc] = useState('');
  const [fileName, setFileName] = useState('');
  const success=useCallback(
      (stream:MediaStream)=>{
        setvalue('摄像头开启成功');
        media.current=stream.getTracks()[0];//获得第0个轨道的视频流
        recoder.current=new MediaRecorder(stream);//传入视频流进行录制
        video.current.srcObject=stream;//获取视频流，设置视频源为stream
        setvalue('开始录制');
        //触发开始录制事件：使用recorder进行,这里设置不同事件发生时的响应函数
        recoder.current.ondataavailable=(event)=>{
          setvalue('开始录制');
          //触发ondataavailable改变的事件,返回Blob类型的数据
          //当触发recoder.stop()事件时触发
          //dataavailable当 MediaRecorder
          //将媒体数据传递到您的应用程序以供使用时，将触发该事件。数据在包含数据的Blob对象中提供。这在四种情况下发生：

          blob.current=new Blob([event.data],{type:'video/mp4'}); //更新当前的BLOB数据
          //下载视频
          let url=URL.createObjectURL(blob.current)
          let linkElement = document.createElement('a') // 创建点击下载的元素,会默认使用
          linkElement.setAttribute('href', url)
          linkElement.setAttribute('downLoad','test')//默认下载为mp4，因为源数据就是mp4
          linkElement.click()
          console.log('blob=====',blob.current);
        }
        //触发结束录制事件，blob接收开始到结束期间录制的数据。发送数据
        recoder.current.onstop=(event)=>{
          setvalue('停止录制');
          //生成文件


          const file=new File([blob.current],'test.mp4',{
            type:'video/webm'});

        	const formData = new FormData();
          formData.append('file', file);
			// fetch返回服务器返回的结果
			   console.log('woc')
			let res=fetch('http://server.deepkw.cn:9024/video', {
				method: 'POST',
				body: formData}
			)
      // console.log(res)
      // res.then((res)=>{console.log(res)})



      .then((res) => {
				res.headers.forEach((v, k) => {
					if (k === 'content-disposition') {
						setFileName(
							decodeURIComponent(v.split("'").pop()!).split(
								'.'
							)[0]
						);
					}
        });
        res.arrayBuffer().then((buffer) => {
					let blob = new Blob([buffer], {
						type: 'video/mp4;'
					});
					let url = URL.createObjectURL(blob);
					console.log(url);
					setSrc(url);
				});
      });
    };

        recoder.current.start();

      }
    ,[])//


//初始会返回stream,
  //在这里，我们正在调用MdeiaDevices.getUserMedia()并请求视频流，它返回一个promise，
  //我们给它附加成功和失败情况下的回调方法
  //成功回调接收一个stream对象作为输入，它是新视频video元素的源
  //成功回调接收一个
  useEffect(
    ()=>{
      if (!on){//停止状态
        if (media.current){
          media.current.stop();
          recoder.current.stop();//停止录制，并触发recoder.current.onstop事件

        }
        return;//不返回任何结果
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

    navigator.mediaDevices.getUserMedia(
      {video:true,audio:false}
    ).then(success)
    .catch((err)=>console.log("An error occured"+err));
    }
    ,[success,on]//将事件与sucess和on进行绑定,当sucess或者on进行重新渲染
    //的时候执行
  );
//在没有链接兼容的相机或者用户拒绝访问的时候，会发生打开流失败的现象
//将startup函数绑定到useEffect上，并与success函数绑定
  return(
    <>
      <video controls autoPlay className="video_get" ref={video}></video>
      <video	controls	autoPlay	className="video4"	src={src}></video>
      <button onClick={()=>{seton(true);}} >开始录制</button>
      <button onClick={()=>{seton(false);}}>停止录制</button>
      <p>{value}</p>
      </>
  )
}
function App() {
  return <Counter />
}

export default App;
