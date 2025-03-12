import { useParams } from "react-router";
import { Empty } from "../components/right/Empty";
import { ShowNote } from "../components/right/ShowNote";

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