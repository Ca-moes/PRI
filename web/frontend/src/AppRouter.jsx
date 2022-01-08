import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import PageLayout from "./components/layout/PageLayout";
import HomePage from "./pages/HomePage";
import ItemPage from "./pages/ItemPage";

const AppRouter = () => (
  <PageLayout>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage/>} />
        <Route path="/item/:asin" element={<ItemPage/>} />
      </Routes>
    </BrowserRouter>
  </PageLayout>
);

export default AppRouter;