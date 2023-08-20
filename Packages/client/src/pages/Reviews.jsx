import { useState, useEffect } from 'react'

import { DisplayReviews } from '../components';
import { useStateContext } from '../context'

import bg_image from '../assets/img/bg/breadcumb.jpg';
import TitleNavigator from "../components/TitleNavigator";

export default function Reviews() {
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { address, contract, getReviews } = useStateContext();
  const loadReviews = async () => {
    setIsLoading(true);
    const data = await getReviews();
    setreviews(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) loadReviews();
  }, [address, contract]);

  return (
      <div>
        {/*{isLoading && <Loader />}*/}
        <main>
          {/* page-title-area start */}
          <TitleNavigator title="Reviewd Masterpiece" />
          {/* page-title-area end */}
          {/* campaign start */}
          <DisplayReviews
              title="All Reviewed Masterpiece"
              isLoading={isLoading}
              reviews={reviews}
          />
          {/* campaign end */}
        </main>

      </div>
  );
}
