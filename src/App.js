import { Header, Footer, Espen, Forecast } from './components/'

function App() {
  return (
  <>
    <Header/>
    <Espen/>
    {Forecast ("Fløien", "60", "5", "316")}
    <Footer/>
  </>
  );
}

export default App;
