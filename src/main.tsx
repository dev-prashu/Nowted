import { createRoot } from "react-dom/client";
import "./index.css";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router";
import { Layout } from "./Layout.tsx";
import Home from "./pages/Home.tsx";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route path="/home" element={<Layout />} />
      <Route path="/folder/:folderId" element={<Home />}>
        <Route path="/folder/:folderId/notes/:noteid" element={<Home />} />
      </Route>
      <Route path="/:isFavorite" element={<Home />} />
      <Route path="/:isFavorite/notes/:noteid" element={<Home />} />
      <Route path="/archive/:isArchived" element={<Home />} />
      <Route path="/archive/:isArchived/notes/:noteid" element={<Home />} />
      <Route path="/trash/:isDeleted" element={<Home />} />
      <Route path="/trash/:isDeleted/notes/:noteid" element={<Home />} />
    </Route>
  )
);

createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
