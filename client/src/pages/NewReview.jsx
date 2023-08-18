import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { ethers } from 'ethers';

import {useAddress} from '@thirdweb-dev/react';
import { useStateContext } from '../context';
import { FormField,Loader } from '../components';
import { checkIfImage } from '../utils';
import TitleNavigator from "../components/TitleNavigator";

export default function NewReview() {
  const address = useAddress();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const { createReview } = useStateContext();
  const [form, setForm] = useState({
    // creator: '',
    // name: '',
    description: '',
    goal: '',
    url: ''
  });

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    checkIfImage(form.media, async (exists) => {
      if (!address){
        alert("No wallet Connected");
        window.location.reload();
      }else {
        if(exists) {
          setIsLoading(true)
          await createReview({ ...form})
          setIsLoading(false);
          navigate('/reviews');
        } else {
          alert('Provide valid image URL')
          setForm({ ...form, media: '' });
        }
      }
    })
  }

  return (
    <div>
        <main>
        {/* page-title-area start */}
          <TitleNavigator title="New review" />
        {/* page-title-area end */}
        <div className="login-area">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 offset-lg-2">
                <div className="basic-login">
                  <form onSubmit={handleSubmit}>
                    <FormField 
                      labelName="Media Title *"
                      placeholder="Write a title"
                      inputType="text"
                      value={form.title}
                      handleChange={(e) => handleFormFieldChange('title', e)}
                    />

                    <FormField 
                      labelName="Backstory *"
                      placeholder="Write your story"
                      isTextArea
                      value={form.description}
                      handleChange={(e) => handleFormFieldChange('description', e)}
                    />

                    <FormField 
                      labelName="Media Url *"
                      placeholder="Media here"
                      inputType="url"
                      value={form.media}
                      handleChange={(e) => handleFormFieldChange('media', e)}
                    />
                    
                    <div className="mt-10" />
                    {isLoading && <Loader />}
                    <button disabled={isLoading} className="btn bg-secondary w-100">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>

      </main>

    </div>
  );
}
