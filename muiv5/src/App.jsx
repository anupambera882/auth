import './App.css';
import { RecoilRoot } from "recoil";
import RoutesComponents from './routes/RoutesComponents';

function App() {
  return (
    <>
      <RecoilRoot>
        <RoutesComponents />
      </RecoilRoot>
    </>
  );
}

export default App;
