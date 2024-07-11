import { BrowserRouter, Route, Routes } from "react-router-dom";
import Main from "./page/Main";
import Update from "./page/Update";
import Save from "./page/Save";

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Main />} />
        <Route path="/" element={<Main />} />
        <Route path="update" element={<Update />} />
        <Route path="save" element={<Save />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
