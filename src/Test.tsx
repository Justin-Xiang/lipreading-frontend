import React, { Component, Fragment } from 'react';
import {useEffect,useState,useRef,useCallback} from 'react'
import {Link} from 'react-router-dom'
import './Main.css'

const Test=()=>{
    const [src, setSrc] = useState('');

    let reader=new FileReader();
    let b64=reader.readAsDataURL(require('../public/origin/1.webm'))
    console.log(b64)
    return (
      <>
<video src={src}>
</video>
      </>
    )
}
export default Test
