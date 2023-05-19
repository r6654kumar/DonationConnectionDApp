import React, { useContext, useEffect, useState } from "react";
import { DonationConnection } from "../Context/DonationConnection";
import { Hero, Card, PopUp } from "../Components";

const index = () => {
  const {
    titleData,
    getCampaigns,
    createCampaign,
    donate,
    getUserCampaigns,
    getDonations
  } = useContext(DonationConnection);

  const [allCampaigns, setAllCampaigns] = useState([]);
  const [userCampaign, setUserCampaign] = useState([]);
  const [openModel, setOpenModel] = useState(false);
  const [donateCampaign, setDonateCampaign] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const allData = await getCampaigns();
      const userData = await getUserCampaigns();
      setAllCampaigns(allData);
      setUserCampaign(userData);
    };

    fetchData();
  }, []);

  return (
    <>
      <Hero titleData={titleData} createCampaign={createCampaign} />
      <Card
        title="All Listed Campaign"
        allCampaigns={allCampaigns}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />
      <Card
        title="Your Created Campaign"
        allCampaigns={userCampaign}
        setOpenModel={setOpenModel}
        setDonate={setDonateCampaign}
      />
      {openModel && (
        <PopUp
          setOpenModel={setOpenModel}
          getDonations={getDonations}
          donate={donateCampaign}
          donateFunction={donate}
        />
      )}
    </>
  );
};

export default index;
