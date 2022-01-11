import React from "react";
import {BrowserRouter, Routes, Route, Navigate} from "react-router-dom";

import PageLayout from "./components/layout/PageLayout";
import ItemPage from "./pages/ItemPage";
import SearchItemsPage from "./pages/SearchItemsPage";
import SearchReviewsPage from "./pages/SearchReviewsPage";
import AboutUsPage from "./pages/AboutUsPage";

const AppRouter = () => (
  <PageLayout>
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Navigate to="/items" replace={true}/>}/>
        <Route path="/item/:asin" element={<ItemPage/>}/>
        <Route path="/items" element={<SearchItemsPage/>}/>
        <Route path="/reviews" element={<SearchReviewsPage/>}/>
      </Routes>
    </BrowserRouter>
  </PageLayout>
);

export default AppRouter;