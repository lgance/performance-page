import '../styles/globals.css'
import type { AppProps } from 'next/app'

import Layout from '../components/layout/ContentTemplate';


export function reportWebvitals(metric:any){
  if (metric.label === 'web-vital') {
    console.log(metric) // The metric object ({ id, name, startTime, value, label }) is logged to the console
  }
}

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Layout >
        <Component {...pageProps} />
      </Layout>
    
    </>
  )
}

export default MyApp
