import type { NextPage } from 'next'
import Head from 'next/head'
import { useCallback, useEffect, useRef } from 'react';
import Image from 'next/image'

import axios from 'axios';
import { rejects } from 'assert';
import { start } from 'repl';
import { resolve } from 'node:path/win32';




const myLoader = ({ src, width, quality }:any) => {
  return `https://sg.object.ncloudstorage.com/sg-ncp-obs-for-ngc/test_image.JPG/${src}?w=${width}&q=${quality || 75}`
}
const AWSS3: NextPage = () => {


  useEffect(()=>{
    console.warn('use Effect Mount');
    
    const getStorageImage = (url:string)=> {
      return new Promise(async(resolve,reject)=>{
        try {
          let {data:{type,arrayBuffer}} = await axios.get('/api/cloud_storage',{params:{url:url}});

          const blob = await new Blob([Uint8Array.from(arrayBuffer)], { type });
          // <a> 태그의 href 속성값으로 들어갈 다운로드 URL
          const downloadUrl = window.URL.createObjectURL(blob);

          resolve(downloadUrl);

        } catch (error) {
          reject(error);   
        }
      });
    }

    const renderingStorageImage = async()=>{
        let startTime = performance.now();

        let downloadURL = await getStorageImage('https://sg.object.ncloudstorage.com/sg-ncp-obs-for-ngc/test_image.JPG');        

        console.warn(downloadURL);

        let endTime = performance.now();

        let totalTime = Math.round(endTime-startTime)+'ms';

        

        console.warn(totalTime);
        return true;

    };
     renderingStorageImage();

  },[])

  return (
    <>
      <Head>
        <title>AWS S3 Image Test</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>


      <div>
        AWS S3 PPAP 
        
      </div>

    </>
  )
}

export default AWSS3;
