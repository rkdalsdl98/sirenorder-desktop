import { useState } from "react";
import style from "./css/mainstyle.module.css"
import Loading from "./docs/common/loading";
import Home from "./routes/home";

function App() {
  const [showLoading, setShowLoading] = useState<boolean>(false)
  return (
    <div>
      {showLoading && <Loading/>}
       <div className={style.background}>
        <div className={style.title}>
          <h3>Siren Order DeskTop</h3>
        </div>
        <Home
        onChangeLoadingState={setShowLoading}
        />
        <span className={style.comment}>
          해당 애플리케이션은 데모버전으로 실제로 결제가 이루어 지지 않으며,
          서버를 같이 구동시켜야 정상적으로 작동합니다.
        </span>
      </div>
    </div>
  );
}

export default App;
