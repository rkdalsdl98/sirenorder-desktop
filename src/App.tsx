import style from "./css/mainstyle.module.css"
import Home from "./routes/home";

function App() {
  return (
    <div className={style.background}>
      <div className={style.title}>
        <h3>Siren Order DeskTop</h3>
      </div>
      <Home/>
      <span className={style.comment}>
        해당 애플리케이션은 데모버전으로 실제로 결제가 이루어 지지 않으며,
        서버를 같이 구동시켜야 정상적으로 작동합니다.
      </span>
    </div>
  );
}

export default App;
