
import MainLayout from './MainLayout';



export default function Layout({children}:any){
  return (
  <>
    <div className="app">
    
      <MainLayout>
        <div className="children_wrap">
          {children}
        </div>
      </MainLayout>
    </div>

    <style jsx global>{`
      .app {
        display:block;
        height:100%;
        overflow:hidden;
        max-width:100%;
        outline:0;
        direction:ltr;
        position:relative;
      }

      .children_wrap{
        padding-left:10px;
      }
    `}
    </style>
  </>
  )
}
