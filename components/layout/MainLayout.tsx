
let region= process.env.VM_Region;

export default function MainLayout({children}:any){
  return (
  <>
    <header>
        <span className="headerText">■● Performance Test  </span>
        <span className="vm-region">현재 VM 위치 [{region}]</span>
    </header>
    <main>
      <div className="mainWrapper">
        <section>
          {children}    
        </section>
      </div>
    </main>


    <footer>
      <span>ⓒ Performance Test by TQM</span>
    </footer>

    <style jsx global>{`
        *{
          box-sizing:border-box;
        }
        h1,h2,h3,h4,h5,h6{
          padding:0;
          margin:0;
        }
       
        html,body{
            padding:0;
            margin:0;
            width:100%;
            height:100%;
            /* overflow:auto; */
            background:white;
            font-size:18px;
            overflow:hidden;
        
        }
        body > div{
          height:100%;
        }
        h1{
            display:inline;   
        }
        ul{
            margin:0px;
            padding:0px;
            list-style:none;
        }

        header{
          display:flex;
          flex-flow:nowrap row;
          align-items:center;
      
          height:45px; 
          /* 65지만 padding 10 계산  */
          width:100%;
          overflow:hidden;
          padding:10px 30px;
          box-shadow :0 0 1px rgba(0,0,0,0.25);

          // background-color:#FAF4C0;
          background-color:#CEFBC9;

          justify-content: space-between;
        }
        header .headerText{
          font-size:1.2rem;
          font-weight:600;
        }

        header .vm-region{
          font-size:1.2rem;
          font-weight:700;
          color:#0100FF
        }

        main{
          display:block;
          height:calc(100% - 85px);
          max-width:1400px;
          min-height:190px;
          margin:0 auto;
          overflow:unset;
        }

        main .mainWrapper{
          display:block;
          height:100%;
          /* padding:5px; */
          overflow: hidden;

        }
        section{
          overflow-y:auto;
          height:100%;
         
        }

        footer{
          height:40px;
          background-color:#F0F0F0
        }
        footer span{
          display:block;
          color:black;
          font-weight:700;
          text-align:center;
          line-height: 40px;
          font-size:15px;
        }
    `}
    </style>
  </>
  )
}
