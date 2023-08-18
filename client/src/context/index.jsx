import {createContext, useContext} from 'react';

import {useAddress, useContract, useContractWrite, useMetamask} from '@thirdweb-dev/react';
import {ethers} from 'ethers';

const StateContext = createContext();

export const StateContextProvider = ({ children }) => {
  const { contract } = useContract("0xe54910b3921AD597078ad35b2B25495b65Db1375");
  const { mutateAsync: newCampaign, isLoading } = useContractWrite(contract, "newCampaign")

  const address = useAddress();
  const connect = useMetamask();

  const postCampaign = async (form) => {
    try {
      const data = await newCampaign([
        address, // owner or creator
        form.title, // this the campaign name
        form.description, // description for the campaign
        new Date().getTime(), // Created atMath.floor(new Date().getTime() / 1000);
        form.url // video url field
      ])

      // contract successful..
      console.info("contract call successful", data);
    } catch (err) {
      console.log("contract failed", err)
    }
  }

  const getVideos = async () => {
    const videos = await contract.call('getVideos');

    return videos.map((campaign, i) => ({
      owner: campaign.creator,
      title: campaign.name,
      description: campaign.description,
      amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
      url: campaign.image,
      pId: i
    }));
  }

  const getUserVideos = async () => {
    const allVideos = await getVideos();

    return allVideos.filter((campaign) => campaign.owner === address);
  }

  const pledgeNow = async (pId, amount) => {
    try {
      //
    } catch (err) {
      if (err) {

        var errorMessageInJson = JSON.parse(
            err.message.slice(58, err.message.length - 2)
        );

        var errorMessageToShow = errorMessageInJson.data.data[Object.keys(errorMessageInJson.data.data)[0]].reason;

        alert(errorMessageToShow);
        return;
      }
    }
    const data = await contract.call('pledge', pId, { value: ethers.utils.parseEther(amount)});

    return data;
  }

  const getDonations = async (pId) => {
    const donations = await contract.call('getPledgers', pId);
    const numberOfDonations = donations[0].length;

    const parsedDonations = [];

    for(let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        pledgers: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString())
      })
    }

    return parsedDonations;
  }


  return (
    <StateContext.Provider
      value={{ 
        address,
        contract,
        connect,
        createCampaign: postCampaign,
        getVideos,
        getUserVideos,
        pledgeNow,
        getDonations
      }}
    >
      {children}
    </StateContext.Provider>
  )
}

export const useStateContext = () => useContext(StateContext);