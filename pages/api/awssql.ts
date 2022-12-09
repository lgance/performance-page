// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as mysql from 'mysql2/promise';
import type { NextApiRequest, NextApiResponse } from 'next'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const sql = `
   select * from awsrdsdb
  `;
  const connection = await mysql.createConnection({
    "host":process.env.AWS_SGN_DB_HOST,
    "user":process.env.AWS_SGN_DB_USERNAME,
    "password":process.env.AWS_SGN_DB_PASSWORD,
    "database":process.env.AWS_SGN_DB_NAME,
  });

  let startTime = performance.now();
  const [ rows ] = await connection.execute(sql);
  let endTime = performance.now();
  let totalTime = Math.round(endTime-startTime)+'ms';


  res.setHeader('Content-Type','application/json');
  res.status(200).send({
    data:rows,
    totalTime:totalTime,
  });
}
  