import { Link } from 'react-router-dom';
import './css/app.css';


function App(): JSX.Element {

  return (
    <>
      <Link to={"auth/register"}>
        <h1>HomePage</h1>
      </Link>
    </>
  )
}

export default App
