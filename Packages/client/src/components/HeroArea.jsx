import {Link} from "react-router-dom";

export default function HerorArea() {
    return <div>
        <section className="hero-area ">
            <div className="hero-slider-area">
                <div className="row no-gutters">
                <div className="col-lg-12">
                    <div
                    className="slide-box d-flex align-items-center"
                    style={{ backgroundImage: "url(assets/img/slider/bg2.jpg)" }}
                    >
                    <div className="slide-box-content text-center">
                        <div className="slide-icon mb-50">
                        <img src="assets/img/slider/icon1.png" alt="" />
                        </div>
                        <div className="slide-text mb-30">
                        <h3>Get your digital arts, videos, audio etc reviewed</h3>
                        </div>
                        <div className="slide-box-btn">
                        <Link to="/new-video" className="btn btn-sign">
                            Checkout Gallery
                        </Link>
                        </div>
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </section>
    </div>;
}