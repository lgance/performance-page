import { browser } from 'process';
import { useEffect ,useState,useCallback} from 'react';
import {onLCP, onFID, onCLS} from 'web-vitals';
import GridRow from './GridRow';



// 리스트 샘플입니다.
function BrowserComponent(){


  let [isMeasureState,setMeasureState] = useState(false);
  let [browserData,setBrowserData] = useState([
    {
      "desc":"전체 소요시간 ",
      "metric_key":"Total",
      "metric_value":"",
      "formula":"ntime.loadEventEnd - ntime.startTime"
    },
    {
      "desc":"동일 origin에서의 redirect 시간 ",
      "metric_key":"Redirect",
      "metric_value":"",
      "formula":"ntime.redirectEnd - ntime.redirectStart"
    },
    {
      "desc":"cache 시간 ",
      "metric_key":"Cache",
      "metric_value":"",
      "formula":"ntime.domainLookupStart - ntime.fetchStart"
    },
    {
      "desc":"DNS Lookup 시간","metric_key":"Dnslookup","metric_value":"","formula":"ntime.domainLookupEnd - ntime.domainLookupStart"
    },
    {
      "desc":"웹서버 연결 시간","metric_key":"Connect","metric_value":"","formula":"ntime.connectEnd - ntime.connectStart"
    },
    {
      "desc":"요청 소요시간 ","metric_key":"Request","metric_value":"","formula":"ntime.responseStart - ntime.requestStart"
    },
    {
      "desc":"응답 데이터를 전부 받은 시간 ","metric_key":"Response","metric_value":"","formula":"ntime.responseEnd - ntime.responseStart"
    },
    {
      "desc":"DOM 객체 생성 시간 ","metric_key":"Dom","metric_value":"","formula":"ntime.domComplete - ntime.domInteractive"
    },
    {
      "desc":"브라우저 Load 이벤트 실행 시간 ","metric_key":"Load","metric_value":"","formula":"ntime.loadEventEnd - ntime.loadEventStart"
    },
    {
      "desc":"서버에서 페이지를 받고 페이지 로드 하는데 걸리는 시간  ","metric_key":"PageEnd","metric_value":"","formula":"ntime.loadEventEnd - ntime.responseEnd"
    },
    {
      "desc":"네트워크 지연 시간 ","metric_key":"NetworkDelay","metric_value":"","formula":"ntime.responseEnd - ntime.fetchStart"
    },
  ])
			

  const renderBrowserMetric = useCallback((browserDataArray:any)=>{
    return browserDataArray.map((row:any,index:number)=>{
        return (
          <GridRow 
            key={index}
            desc={row.desc}
            metric_key={row.metric_key}
            metric_value={row.metric_value}
            formula={row.formula}
          />
        )
    })
  },[browserData])

  useEffect(()=>{
    
    const timer =setTimeout(()=>{
      let ntime:any = performance.getEntriesByType('navigation')[0];

      let total = ntime.loadEventEnd - ntime.startTime; //전체 소요시간
      let redirect = ntime.redirectEnd - ntime.redirectStart; // 동일 origin에서의 redirect 시간
      let cache = ntime.domainLookupStart - ntime.fetchStart; // cache 시간
      let dnslookup = ntime.domainLookupEnd - ntime.domainLookupStart; //DNS Lookup 시간
      let connect = ntime.connectEnd - ntime.connectStart; // 웹서버 연결 시간
      let request = ntime.responseStart - ntime.requestStart; // 요청 소요 시간
      let response = ntime.responseEnd - ntime.responseStart; // 응답 데이터를 모두 받은 시간
      // var dom = ntime.domComplete - ntime.domLoading; // DOM객체 생성 시간 *******************
      let dom = ntime.domComplete - ntime.domInteractive; // DOM객체 생성 시간 *******************
      let load = ntime.loadEventEnd - ntime.loadEventStart; // 브라우저의 Load 이벤트 실행시간
      let pageEnd = ntime.loadEventEnd - ntime.responseEnd; //  서버에서 페이지를 받고 페이지를 로드하는데 걸린 시간
      let networkDelay = ntime.responseEnd - ntime.fetchStart; //  네트워크 지연 시간

      let metric_keys = [
        total,redirect,cache,dnslookup,connect,request,response,dom,load,pageEnd,networkDelay
      ]
     
      let updateMetric = browserData.map((item:any,index:number)=>{
        return {...item,["metric_value"]:metric_keys[index]}
      });
        
      console.warn(updateMetric);

      setBrowserData(updateMetric);
      setMeasureState(true);
      const [entry] = performance.getEntriesByType("navigation");

      // Show it in a nice table in the developer console
      // console.table(entry.toJSON());

      // console.log("total : " + total + "ms  >>>>>>>  전체 소요시간");
      // console.log("redirect : " + redirect + "ms  >>>>>>>   동일 origin에서의 redirect 시간");
      // console.log("cache : " + cache + "ms   >>>>>>>  cache 시간");
      // console.log("dnslookup : " + dnslookup + "ms  >>>>>>>  DNS Lookup 시간");
      // console.log("connect : " + connect + "ms  >>>>>>>  웹서버 연결 시간");
      // console.log("request : " + request + "ms  >>>>>>>  요청 소요 시간");
      // console.log("response : " + response + "ms  >>>>>>>  첫 응답으로 부터 응답 데이터를 모두 받은 시간");
      // console.log("dom : " + dom + "ms  >>>>>>>  DOM객체 로드 완료 시간");
      // console.log("load : " + load + "ms  >>>>>>>  브라우저의 Load 이벤트 실행시간");
      // console.log("pageEnd : " + pageEnd + "ms  >>>>>>>  서버에서 페이지를 받고 페이지를 로드하는데 걸린 시간");
      // console.log('Network Delay : ' + networkDelay +"ms >>>>>>  네트워크 지연시간 ")

      // console.warn(ntime);

      
      // onCLS(console.log);
      // onFID(console.log);
      // onLCP(console.log);
    },2000)

  },[])

  return (
  <>
      <div>
        <h3>브라우저 성능 측정 [{isMeasureState===false ? '측정 중' : '측정 완료'}]</h3>
        <h5> ntime = Browser Navigation Timing Interface</h5>
      </div>
      <div className="api-grid-title">
        <div className="task-status">
            <table className="task-table">
              <colgroup>
                <col width="120px"/>
                <col width="150px"/>
                <col width="350px"/>
                <col width="*"/>
              </colgroup>
              <thead>
                <tr>
                  <th>Metric</th>
                  <th>Value</th>
                  <th>Formula</th>
                  <th>Desc</th>
                </tr>
              </thead>
              {renderBrowserMetric(browserData)}
            </table>
        </div>
      </div>

      <style jsx>{`
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
      `}</style>
      
  </>
  )
}



export default BrowserComponent;