import { useParams } from "react-router";
import { Empty } from "../components/Empty";
import { ShowNote } from "../components/ShowNote";

function Home() {

  const {noteid} = useParams();


  return (
    <>
    {noteid? (<>
    <ShowNote/>
    </>):(<>
      <Empty/>
    </>) }
    
    </>
  )
}

export default Home