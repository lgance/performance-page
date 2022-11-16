import React from 'react';
import { useEffect ,useCallback ,useState } from 'react';
import getConfig from 'next/config';
import axios from 'axios';
import { useRouter } from 'next/router'

function GridRow(rowData:any,clickRef:any){
  const {
    desc,
    metric_key,
    metric_value,
    formula
  } = rowData;


  let metric_correction_value = Math.round(metric_value)+"ms";
 
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

      await testSleep();


    } catch (error:any) {

    }
  },[]);

  return (
  <>
      <tbody className={"api-list-summary-body"}>
        <tr>
          <td >
               { metric_key } 
          </td>

          <td>
                {metric_correction_value }
          </td>
        
          <td>
                { formula }
          </td>
          <td>
                {desc}
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
          text-align:left;
        }
        tbody tr td:nth-child(1){
          padding-left:5px;
        }

        tbody tr td:nth-child(3)
        {
          text-align:left;
        }
        
        tr td{
          text-overflow:ellipsis;
          overflow:hidden;

        }
    
        /* CSS */
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


export default React.memo(React.forwardRef(GridRow),equalComparison)


