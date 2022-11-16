import React from 'react';
import { useEffect ,useCallback ,useState } from 'react';
import getConfig from 'next/config';
import axios from 'axios';
import { useRouter } from 'next/router'
import { setDefaultResultOrder } from 'dns';

function PerformanceGridRow(rowData:any,clickRef:any){
  const {
    type,
    url,

    refIndex
  } = rowData;

  const [ status,  setStatus] = useState('READY'); // READY / START / COMPLETE 
  const [ delay , setDelay ] = useState('NOT Measure');
  const [ responseData ,setResponseData ] = useState('NOT RECV');
  useEffect(()=>{

  },[])


  // 진행상황 보려고 임시로 걸었음 ㅎ;
  const testSleep = ()=>{
    return new Promise(async(resolve,reject)=>{
      setTimeout(()=>{
        resolve(true);
      },500);
    })
  }
  const trigger_API = useCallback(async(e:any)=>{
    try {
      e.preventDefault();
      e.stopPropagation();

      setStatus('START');

      // 시작 시간 
      let startTime = performance.now();

      if(type==='GET'){
        let {data:{type,arrayBuffer}} = await axios.get('/api/cloud_storage',{params:{url:url}});

        // 종료 시간
        let endTime = performance.now();
        let totalTime = Math.round(endTime-startTime)+'ms';

        const blob = await new Blob([Uint8Array.from(arrayBuffer)], { type });
        // <a> 태그의 href 속성값으로 들어갈 다운로드 URL
        const downloadUrl = window.URL.createObjectURL(blob);

        setResponseData(type)
        setDelay(totalTime);
      
      }
      else if(type==='SQL'){
        let {data} = await axios.get('/api/sql');


        console.warn(data);
        let endTime = performance.now();
        let totalTime = Math.round(endTime-startTime)+'ms';

        setResponseData("test");
        setDelay(totalTime)
      }
      setStatus('COMPLETE');

    } catch (error:any) {

      setStatus('COMPLETE');
      if(error.response){
        let resData = error.response.data;
        console.warn(resData);
        setResponseData(error.message);
      }
      else{
        setResponseData('FAIL');

      }
      
      setDelay('1');      
      console.warn(error);
      
    }
  },[]);

  return (
  <>
      <tbody className={"api-list-summary-body"}>
        <tr>
          <td >
               {type} 
          </td>

          <td>
                {url}
          </td>
          <td>
            {responseData}

          </td>
          <td>
              {delay}
          </td>
          <td>
              {status}

          </td>

          <td>
            <div className="button-container">
                <button ref={ref=>clickRef.current[refIndex] = ref} className="button-85" role="button" onClick={(e:any)=>{trigger_API(e);}}>RUN</button>
              </div>
          </td>
        </tr>

      </tbody>
      <style jsx>{`
        tbody{
         font-size:12px;
         border-bottom:1px solid #e2e2e2;
        }
        tbody.api-list-summary-body > tr:nth-child(1):hover{
          background-color:#F0F0F0;
        }

        tbody.api-list-summary-body.show > tr:nth-child(1):hover{
          background-color:#344372;
        }

        tbody tr{
          // background-color:#e2e2e2;
        }

        tbody tr td{
          text-align:center;
          font-size:14px;
        }
        
        tbody tr td:nth-child(1){
          padding-left:5px;
          text-align:center;
        }
        tbody tr td:nth-child(2){
          text-align:left;
        }

        
        tr td{
          text-overflow:ellipsis;
          overflow:hidden;

        }
    
  

        tbody .button-85 {
          padding: 0.4em 2em;
          border: none;
          outline: none;
          color: rgb(255, 255, 255);
          background: #111;
          cursor: pointer;
          position: relative;
          z-index: 0;
          border-radius: 10px;
          user-select: none;
          -webkit-user-select: none;
          touch-action: manipulation;
        }
        
        tbody .button-85:before {
          content: "";
          background: linear-gradient(
            45deg,
            #ff0000,
            #ff7300,
            #fffb00,
            #48ff00,
            #00ffd5,
            #002bff,
            #7a00ff,
            #ff00c8,
            #ff0000
          );
          position: absolute;
          top: -2px;
          left: -2px;
          background-size: 400%;
          z-index: -1;
          filter: blur(5px);
          -webkit-filter: blur(5px);
          width: calc(100% + 4px);
          height: calc(100% + 4px);
          animation: glowing-button-85 20s linear infinite;
          transition: opacity 0.3s ease-in-out;
          border-radius: 10px;
        }
        
        @keyframes glowing-button-85 {
          0% {
            background-position: 0 0;
          }
          50% {
            background-position: 400% 0;
          }
          100% {
            background-position: 0 0;
          }
        }
        
        tbody .button-85:after {
          z-index: -1;
          content: "";
          position: absolute;
          width: 100%;
          height: 100%;
          background: #222;
          left: 0;
          top: 0;
          border-radius: 10px;
        }






      `}
      </style>
  </>
  )
}
const equalComparison = (prevProps:any,nextProps:any)=>{
  
  // 기본적으로는 렌더링을 안함 true
  // 렌더링을 함  false
  // 렌더링 안함 - true 
  let returnValue = false;
  
  return returnValue;
}


export default React.memo(React.forwardRef(PerformanceGridRow),equalComparison)


