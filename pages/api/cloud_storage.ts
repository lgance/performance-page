// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import axios from 'axios';
import type { NextApiRequest, NextApiResponse } from 'next'

export interface FileResponse{
  type:string;
  arrayBuffer:number[]
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FileResponse>
) {
  const { url } = req.query;
  const rawData = await fetch(url as string);

  const blob = await rawData.blob();
  console.warn(blob);

  res.status(200).send({
    type:blob.type,
    arrayBuffer:Object.values(new Uint8Array(await blob.arrayBuffer()))
  })
}
