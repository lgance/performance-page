import type { NextPage } from 'next'
import { useEffect, useState } from 'react';

const AWSS3: NextPage = (props:any) => {

  let { type,arrayBuffer,totalTime } = props;
  const [src ,setSrc ]= useState('');

  // page Initialize 
  useEffect(()=>{
    const rendering =async()=>{
        // Image BLOB Create 
      const blob = await new Blob([Uint8Array.from(arrayBuffer)], { type });

       // Create URL Object 
      const downloadUrl = window.URL.createObjectURL(blob);

      // Set Img TAG URL 
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
  

  // GET Test URL 
  let testURL = process.env.NCP_SGN_OBS;

  // Test Start 
  let startTime = performance.now();

  // fetch BLOB
  const rawData = await fetch(testURL as string);
  // create BLOB
  const blob = await rawData.blob();

  // Test End
  let endTime = performance.now();

  // Check Total Test Time
  let totalTime = Math.round(endTime-startTime)+'ms';

  // Test Log String
  let ncpOBSTimeString = `NCP VPC SGN OBS ${totalTime} URL : ${testURL} `

 // SSR Rendering
 return { props: {
  type:blob.type,
  arrayBuffer:Object.values(new Uint8Array(await blob.arrayBuffer())),
  totalTime:ncpOBSTimeString
} }
}


export default AWSS3;
