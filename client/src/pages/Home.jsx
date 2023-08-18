import React, { useState, useEffect } from 'react'

import { DisplayReviews } from '../components';
import { useStateContext } from '../context'
import HeroArea from '../components/HeroArea';
import HowItWorks from "../components/HowItWorks";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [reviews, setReviews] = useState([]);

  const { address, contract, getReviews } = useStateContext();

  const fetchReviews = async () => {
    setIsLoading(true);
    const data = await getReviews();
    setReviews(data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(contract) fetchReviews();
  }, [address, contract]);

    return <div>
        <main>
            {/* hero-area start */}
             <HeroArea />
            <HowItWorks />
            {/* hero-area end */}
            {/* review start */}
            <DisplayReviews
                title="Popular Masterpiece!"
                isLoading={isLoading}
                reviews={reviews}
            />
            {/* review end */}
        </main>
    </div>;
}