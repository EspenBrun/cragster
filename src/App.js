import { useState } from 'react'
import { Header, Routes, Footer } from './components/'

function App() {
  const [grade, setGrade] = useState('7+')
  return (
  <>
    <Header/>
    <form>
      <label>Enter grade:
        <input
          type="text" 
          value={grade}
          onChange={(e) => setGrade(e.target.value)}
        />
      </label>
    </form>
    {Routes(grade)}
    <Footer/>
  </>
  );
}

export default App;
