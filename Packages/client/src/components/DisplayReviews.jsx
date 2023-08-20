import React from 'react';
import { useNavigate } from 'react-router-dom';

import ReviewCard from './ReviewCard';
import { loader } from '../assets';

const DisplayReviews = ({ title, isLoading, reviews }) => {
    const navigate = useNavigate();

    /* Encode string to slug */
    function toSlug(title) {
        return title.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }


    const handleNavigate = (review) => {
        const url = toSlug(review.title);
        navigate(`/reviews/${url}`, { state: review })
    }

    return <div>
        <section className="causes-area grey-bg pt-120 pb-120">
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-xl-12">
                        <div className="section-title text-center mb-60">
                            <p>
                                <span /> {title}  ({reviews.length})
                            </p>
                            {/*<h2>Invest Now Before Time expires</h2>*/}
                        </div>
                    </div>
                </div>
                <div className="row">
                    {isLoading && (
                        <img src={loader} alt="loader" className="object-contain" />
                    )}

                    {!isLoading && reviews.length === 0 && (
                        <p className="">
                            No review created.
                        </p>
                    )}

                    {!isLoading && reviews.length > 0 && reviews.map((review) => <ReviewCard
                        key={review.pId}
                        {...review}
                        handleClick={() => handleNavigate(review)}
                    />)}
                </div>
                <div className="row mt-30">
                    <div className="col-xl-12">
                        <div className="section-link text-center">
                            {reviews.length > 6 ? '<a className="btn-border" href="#">more projects</a>': ''}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    </div>
}

export default DisplayReviews