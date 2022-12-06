import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

const AWSS3: NextPage = (props:any) => {

  let { type,arrayBuffer,totalTime } = props;
  const [src ,setSrc ]= useState('');



  useEffect(()=>{
    const rendering =async()=>{
      const blob = await new Blob([Uint8Array.from(arrayBuffer)], { type });
      const downloadUrl = window.URL.createObjectURL(blob);
      setSrc(downloadUrl);

    }
    rendering();
    console.warn(totalTime);


  },[])
  return (
    <>
        <div>
                <img src={src} />
        </div>
    </>
  )
}
export async function getServerSideProps() {
  // 테스트 시작 
  let startTime = performance.now();

  let testURL = 'https://sg-aws-s3.s3.ap-southeast-1.amazonaws.com/test_image.JPG'
  const rawData = await fetch(testURL as string);
  const blob = await rawData.blob();

 // 테스트 종료 
 let endTime = performance.now();

 // 확인 
 let totalTime = Math.round(endTime-startTime)+'ms';

 
 // SSR 렌더링 ( 데이터 다 받은 후 렌더링 )
 let awsS3TimeString = `AWS S3  ${totalTime} URL : ${testURL} `

 return { props: {
  type:blob.type,
  arrayBuffer:Object.values(new Uint8Array(await blob.arrayBuffer())),
  totalTime:awsS3TimeString

} }
}


export default AWSS3;
