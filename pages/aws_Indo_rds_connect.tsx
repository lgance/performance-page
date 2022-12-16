import type { NextPage } from 'next'
import * as mysql from 'mysql2/promise';


type poolConnection = mysql.PoolConnection;

const AWS_RDS: NextPage = (props:any) => {
  let { dbConnectTime } = props;
  return (
    <>
        <>
            {dbConnectTime}
        </>
    </>
  )
}


export async function getServerSideProps() {

  // DBMS Connector를 통한 GET DATA
  const sql = `
  select * from awsrdsindo
 `;

 const connection = await mysql.createConnection({
  "host":process.env.AWS_JKT_DB_HOST,
  "user":process.env.AWS_JKT_DB_USERNAME,
  "password":process.env.AWS_JKT_DB_PASSWORD,
  "database":process.env.AWS_JKT_DB_NAME,
});

 // 테스트 시작 
 let startTime = performance.now();
 const [ rows ] = await connection.execute(sql);
 // 테스트 종료 
 let endTime = performance.now();

 // 후처리 
 let result = JSON.parse(JSON.stringify(rows));

 // 확인 
 let totalTime = Math.round(endTime-startTime)+'ms';

 // 연결 해제 
 await connection.end();
 // 길이 
 console.warn('AWS Jakarta RDS GET DATA  '  +  result.length);


 // SSR 렌더링 ( 데이터 다 받은 후 렌더링 )
 return { props: { dbConnectTime:totalTime } }
}
export default AWS_RDS;
