import { useEffect ,useState,useCallback, useRef} from 'react';

import PerformanceGridRow from './PerformanceGridRow';




// 리스트 샘플입니다.
function TestPerformance(props:any){
  let { vendor ,testRow } = props;

  let [performanceList,setPerformanceList] = useState(testRow);

  const buttonRef:any = useRef<[]>([]);

  const AllTestStart = useCallback(()=>{
    alert("전체 테스트 시작합니다.");
    for(let i=0;i<performanceList.length;i++){
      buttonRef.current[i].click();
    }
    },[performanceList])

  const renderPerformanceList = useCallback((browserDataArray:any)=>{
    return browserDataArray.map((row:any,index:number)=>{
        return (
          <PerformanceGridRow 
            key={index}
            type={row.type}
            url={row.url}
            refIndex={index}
            ref={buttonRef}
          />
        )
    })
  },[performanceList])


  return (
  <>
     <div>
        <div className="vendor-header">
          <h3>Target Vendor {vendor} </h3>
          <button>
            <span onClick={()=> AllTestStart()} className="btn-text">전체 테스트 시작</span>
          </button>
        </div>

        <div className="input-layer">
          <button>
            <span className="btn-text">추가</span>
          </button>
          <label>GET 으로 호출할 주소 </label>
          <div><input /></div>
        
        </div>
        <div className="api-grid-title">
          <div className="task-status">
            <table className="task-table">
              <colgroup>
                <col width="100px"/>
                <col width="*"/>
                <col width="200px"/>
                <col width="100px"/>
                <col width="100px"/>
                <col width="100px"/>
              </colgroup>
              <thead>
                <tr>
                  <th>TYPE</th>
                  <th>URL</th>
                  <th>Response</th>
                  <th>Delay</th>
                  <th>RESULT</th>
                  <th>TEST_RUN</th>
                </tr>
              </thead>
              {renderPerformanceList(performanceList)}
            </table>
          </div>
        </div>

     </div>

     <style jsx>{`
        .vendor-header{
          display:flex;
          flex-flow:row nowrap;
          justify-content:space-between;
          padding:10px 5px;
        }
        .input-layer{
          display:flex;
          flex-flow:row nowrap;
          align-items:center;
         
        }
       
        .input-layer label{
          height:30px;
          line-height:30px;
          font-size:12px;
          margin-right:15px;
        }
        .input-layer button{
          margin-right:10px
        }
        .input-layer input{
          
          height:26px;
          border-radius:2px;
          border-color:#e2e2e2;
          font-size:12px;
          padding:0 10px;
          line-height:14px;
          border: 1px solid rgba(0,0,0,0.15);
          background-image:none;
          background-color:#fff;
          box-sizing:border-box;
          color:#464a4c;
          outline:none;

          width:400px;
        }

        button{
          padding:10px 14px;
          border-radius:8px;
          border:0px solid white;
          background-color:#4070f4;
          box-shadow :0 5px 10px rgba(0, 0, 0, 0.2);
          cursor:pointer;

          
        }
        button .btn-text{
          font-size:12px;
          color:#fff;
          font-weight:400px;
        
        }


        .api-grid-title{
          display:flex;
          justify-content: space-between;
          
          font-weight:500;

          padding:15px 20px;
          background-color:#EAEAEA;
  
          margin-bottom:20px;
        }


        div.task-status {
          display:flex;
          flex-flow:column nowrap;
          overflow:auto;
  
          // min-height:65px;
          padding:0px 1px;
          background-color:#e2e2e2;
          
          height:calc( 100% - 100px );
        }
        
        // table css 
        table.task-table{
          display:table;
          position:relative;
          border-radius:2px;
          overflow:auto;
          background-color:#fff;

          width:100%;
          // min-width:1000px;
          table-layout:fixed;
        }

            // table header css 
          table.task-table th{
            font-weight:500;
            vertical-align:bottom;
            background-color:#fff;
            font-size:12px;
            line-height:18px;
            padding:6px 10px;
            border-bottom:1px solid #e2e2e2;
          }
          // table row css 
          table.task-table tr{
            display:table-row;
            height:30px;
          }

          table.task-table td{
            padding:6px 10px;
            border-left:1px solid #e2e2e2;
            border-right:1px solid #e2e2e2;
            line-height:18px;
            font-size:12px;
            min-height:30px;
            height:30px;
            border-bottom:1px solid #e2e2e2;
            overflow:hidden;
          }






      `}
      </style>
  </>
  )
}

export default TestPerformance;
