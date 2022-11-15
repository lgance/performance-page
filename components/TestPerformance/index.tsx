




// 리스트 샘플입니다.
function NcpComponent(props:any){
  let { vendor } = props;

  return (
  <>
     <div>
        <div className="vendor-header">
          <h3>Target Vendor {vendor} </h3>
          <button>
            <span className="btn-text">전체 테스트 시작</span>
          </button>
        </div>

        <div className="input-layer">
          <button>
            <span className="btn-text">추가</span>
          </button>
          <label>GET 으로 호출할 주소 </label>
          <div><input /></div>
        
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
      `}
      </style>
  </>
  )
}

export default NcpComponent;