import React from 'react';
import { Route, Routes } from 'react-router-dom';

import { Header, Footer } from './components';
import { ReviewDetails, NewReview, Home, Dashboard, Reviews} from './pages';

export default function App() {
  return (
    <div>
    {/* preloader */}
    {/* <Preloader /> */}
    {/* preloader end  */}
    {/* header start */}
    <Header />
    {/* header end */}
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/reviews" element={<Reviews />} />
      <Route path="/new-review" element={<NewReview />} />
      <Route path="/review/:id" element={<ReviewDetails />} />
    </Routes>
    {/* footer start */}
    <Footer />
    {/* footer end */}
    </div>
  );
}
