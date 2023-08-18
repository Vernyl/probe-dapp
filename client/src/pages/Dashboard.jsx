import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { DisplayReviews } from '../components';
import { useStateContext } from '../context'

import bg_image from '../assets/img/bg/breadcumb.jpg';
import TitleNavigator from "../components/TitleNavigator";

export default function Dashboard() {
    const [isLoading, setIsLoading] = useState(false);
    const [reviews, setReviews] = useState([]);

    const { address, contract, getUserReviews } = useStateContext();

    const fetchReviews = async () => {
        setIsLoading(true);
        const data = await getUserReviews();
        setReviews(data);
        setIsLoading(false);
    }

    useEffect(() => {
        if(contract) fetchReviews();
    }, [address, contract]);

    return (
        <div>
            {/*{isLoading && <Loader />}*/}
            <main>
                {/* page-title-area start */}
                <TitleNavigator title="My reviews" />
                {/* page-title-area end */}
                {/* video start */}
                <DisplayReviews
                    title="My Reviews"
                    isLoading={isLoading}
                    reviews={reviews}
                />
                {/* video end */}
            </main>

        </div>
    );
}
