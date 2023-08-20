import React from 'react'
import bg_image from "../assets/img/bg/breadcumb.jpg";

export default function TitleNavigator({title}){
    return (
        <div>
            <section
                className="page-title-area pt-20"
                style={{ backgroundImage: `url(${bg_image})` }}
            >
                <div className="container">
                    <div className="row">
                        <div className="col-xl-12">
                            <div className="page-title-white text-center">
                                <h3 className="text-white">{ title }</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}