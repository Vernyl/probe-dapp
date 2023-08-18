import { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';

import { useStateContext } from '../context';
import {Loader} from '../components';
import bg_image from '../assets/img/bg/breadcumb.jpg';
import { calculateBarPercentage, daysLeft } from '../utils';
import {ethers} from "ethers";

export default function ReviewDetails() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { pledgeNow, getDonations, contract, address } = useStateContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState('');
  const [pledgers, setPledgers] = useState([]);

  const remainingDays = daysLeft(state.deadline);

  const fetchPledgers = async () => {
    const data = await getDonations(state.pId);

    setPledgers(data);
  }
  const shareUrl = window.location.href;
  useEffect(() => {
    if(contract) fetchPledgers();
  }, [contract, address])

  function refreshPage() {
    window.location.reload();
  }

  const handlePledge = async () => {
    setIsLoading(true);

    if (!address){
      alert("No wallet Connected");
      window.location.reload();
    }else {
      try{
        await pledgeNow(state.pId, amount);
        alert("Transaction Successful")
        // refreshPage();
        navigate('/videos');
      }catch (e) {
        let error = JSON.parse(
            JSON.stringify(e.message)
        );
        if (error.indexOf('Internal JSON-RPC error.') > -1) {
          alert("Error here")
        }
        console.log("There's an error", e)
        setIsLoading(false);
      }
    }
    // navigate('/videos')
    setIsLoading(false);
  }

  return (
      <div>
        {/*{isLoading && <Loader />}*/}
        <main>
          {/* page-title-area start */}
          <section
              className="page-title-area pt-50 pb-50"
              style={{ backgroundImage: `url(${bg_image})` }}
          >
            <div className="container">
              <div className="row">
                <div className="col-xl-12">
                  <div className="page-title page-title-white text-center">
                    <h2>{ state.title }</h2>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* page-title-area end */}
          {/* event-area start */}
          <section className="event-area pos-relative pt-90 pb-120">
            <div className="container">
              <div className="row">
                <div className="col-lg-9 col-md-9 ">
                  <div className="event-day-time pl-15">
                    <div className="section-title mb-30">
                      <p>
                        <span /> Category
                      </p>
                      <h1>{ state.title }</h1>
                    </div>
                  </div>
                </div>
                <div className="col-md-12">
                  <div className="bakix-video mb-60">
                    <img src={state.image} alt="" />
                  </div>
                  <div className="col-12">
                    <div className="fund-info mb-30">
                      <strong>Creator :{state.owner}</strong>
                    </div>
                  </div>
                  <div className="fund-progress mb-50">
                    <div className="progress">
                      <div
                          className="progress-bar"
                          role="progressbar"
                          style={{ width: `${calculateBarPercentage(state.goal, state.amountCollected)}%`, maxWidth: '100%'}}
                          aria-valuenow={calculateBarPercentage(state.goal, state.amountCollected)}
                          aria-valuemin={0}
                          aria-valuemax={100}
                      />
                    </div>
                    <div className="payment-count details-fund-count d-md-flex justify-content-between mt-20 fix">
                      <div className="fund-count">
                        <h2>{ state.amountCollected} Eth</h2>
                        <span>Pledged</span>
                      </div>
                      <div className="fund-count  ">
                        <h2>{state.goal} Eth</h2>
                        <span>Goal</span>
                      </div>
                      <div className="fund-count  ">
                        <h2>{pledgers.length}</h2>
                        <span>Backers</span>
                      </div>
                      <div className="fund-count  ">
                        <h2>{remainingDays} </h2>
                        <span>Days To Go</span>
                      </div>
                    </div>
                  </div>
                  <div className="fund-text mb-50">
                    <h4>Video Description</h4>
                    <p>{state.description}</p>
                    <div className="col-12">
                      <h4 className="text-title uppercase">Backers</h4>

                      <div className="gap-4">
                        {pledgers.length > 0 ? pledgers.map((item, index) => (
                            <div key={`${item.donator}-${index}`} className="flex justify-between items-center gap-4">
                              <p>
                                {index + 1}. {item.donator} <span style={{color: "red"}}>
                                <i className="fa fa-heart"></i></span> {item.donation} Eth
                              </p>
                            </div>
                        )) : (
                            <p className="font-epilogue font-normal text-justify">No backer yet. Be the first one!</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                {isLoading && <Loader />}
              </div>
              <div className="row">
                <div className="col-xl-6 col-lg-12">
                  <div className="fund-form mb-30">
                    <form action="#">
                      <input
                          type="number"
                          placeholder="Enter your amount"
                          value={amount}
                          onChange={(e) => setAmount(e.target.value)}
                      />
                      <button disabled={isLoading}
                          className="btn"
                          type="button"
                          onClick={handlePledge}
                      >
                        back this project <img src="assets/img/icon/arrow.png" alt="" />
                      </button>
                    </form>
                  </div>
                </div>
                <div className="col-xl-6 col-lg-12  ">
                  <div className="fund-right mb-30">
                    <div className="remind mb-15">
                      <a href="#" className="btn btn-black">
                        <i className="fas fa-heart" /> remind me
                      </a>
                    </div>
                    <div className="fund-icon mb-15 ">
                      <a href="#">
                        <i className="fab fa-facebook-f" />
                      </a>
                      <a href="#">
                        <i className="fab fa-twitter" />
                      </a>
                      <a href="#">
                        <i className="fab fa-linkedin-in" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
          {/* event-area end */}
        </main>

      </div>
  );
}
