import { Footer } from "./components/layout";
import Header from "./components/layout/Header";
import Home from "./page/Home";
// import MusicFila from "./page/MusicFila";
import PlayList from "./page/PlayList";

function App() {

  return (
    <div className="bg-black w-full overflow-hidden  h-[100vh] ">
      <Header />
      <div className="flex mt-2 gap-2 px-2  max-w-full">
        <PlayList />
        <Home />

      </div>
      <Footer />
    </div>
  )
}

export default App

