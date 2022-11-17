// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import * as dbms from '../../ncpdbms'
import * as mysql from 'mysql2/promise';

import type { NextApiRequest, NextApiResponse } from 'next'


type poolConnection = mysql.PoolConnection;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const { url } = req.query;
  
  const sql = `
   select * from ncpdb
  `;


  
  const values:any = [];
  const conn:poolConnection = await dbms.DB.getPoolConnection();

  const [rows] = await conn.execute(sql,values);

  let result = JSON.parse(JSON.stringify(rows));
  await conn.release();
  res.setHeader('Content-Type','application/json');
  res.status(200).send(rows);
}
  