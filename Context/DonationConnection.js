import React, { useEffect, useState } from 'react'
import Web3Modal from "web3modal";
import { ethers } from "ethers";
import { DonationConnectionABI, DonationConnectionAddress } from "./contants";
const fetchContract= (signerOrProvider) => new ethers.Contract(DonationConnectionAddress, DonationConnectionABI, signerOrProvider);
export const DonationConnection = React.createContext();
export const DonationConnectionProvider = ({ children }) => {
    const titleData = "Donation Connection Contract";
    const [currentAccount, setCurrentAccount] = useState("");
    const createCampaign = async (campaign) => {
        const { title, description, amount, deadline } = campaign;
        const web3modal = new Web3Modal();
        const connection = await web3modal.connect();
        const provider =new  ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        console.log(currentAccount);
        try {
            const transaction = await contract.createCampaign(
                currentAccount,//owner
                title,
                description,
                ethers.utils.parseUnits(amount, 18),
                new Date(deadline).getTime()

            );
            await transaction.wait();
            console.log("Contrats called successfully", transaction);
        } catch (error) {
            console.log("Contracts call failue", error);
        }
    }
    const getCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const campaigns = await contract.getCampaigns();
        const parsedCampaigns = campaigns.map((campaign, i) => ({
            owner: campaign.owner,
            title: campaign.title,
            description: campaign.description,
            target: ethers.utils.formatEther(campaign.target.toString()),
            deadline: campaign.deadline.toNumber(),
            amountCollected: ethers.utils.formatEther(
                campaign.amountCollected.toString()),
            pId: i,
        }));
        return parsedCampaigns;
    };
    const getUserCampaigns = async () => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const allCampaigns = await contract.getCampaigns();
        const accounts = await window.ethereum.request({
          method: 'eth_accounts',
        });
        const currentUser = accounts[0]; 
        const filteredCampaigns = allCampaigns.filter(
          (campaign) =>
            campaign.owner === '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266' 
        );
        const userData = filteredCampaigns.map((campaign, i) => ({
          owner: campaign.owner,
          title: campaign.title,
          description: campaign.description,
          target: ethers.utils.formatEther(campaign.target.toString()),
          deadline: campaign.deadline.toNumber(),
          amountCollected: ethers.utils.formatEther(campaign.amountCollected.toString()),
          pId: i,
        }));
        return userData;
      };
      
    const donate = async (pId, amount) => {
        const web3modal = new Web3Modal();
        const connection = await new web3modal.connect();
        const provider = new ethers.providers.Web3Provider(connection);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);

        const campaignData = await contract.donateToCampaign(pId, {
            value: ethers.utils.parseEther(amount),

        });
        await campaignData.wait();
        location.reload();
        return campaignData;

    };

    const getDonations = async (pId) => {
        const provider = new ethers.providers.JsonRpcProvider();
        const contract = fetchContract(provider);
        const donations = await contract.getDonators(pId);
        const numberOfDonations = donations[0].length;
        const parsedDonations = [];
        for (let i = 0; i < numberOfDonations; i++) {
            parsedDonations.push({
                donator: donations[0][i],
                donation: ethers.utils.formatEther(donations[1][i].toString()),
            });
        }
        return parsedDonations;
    };
    //-------------Check Wallet is connected or not
    const checkIfWalletIsConnected = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_accounts",

            });
            if (accounts.length) {
                setCurrentAccount(accounts[0]);
            }
            else {
                console.log("No Accounts Found");
            }
        }
        catch (error) {
            console.log("Something wrong while connecting to metamask wallet");
        }
    };
    useEffect(() => {
        checkIfWalletIsConnected();
    }, []);
    //-----------Connect Wallet Function
    const connectWallet = async () => {
        try {
            if (!window.ethereum)
                return setOpenError(true), setError("Install Metamask");

            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts",
            });
            setCurrentAccount(accounts[0]);
        } catch (error) {
            console.log("Something wrong while connecting to metamask wallet");
        }
    };
    return (
        <DonationConnection.Provider
            value={{
                titleData,
                currentAccount,
                createCampaign,
                getCampaigns,
                getUserCampaigns,
                donate,
                getDonations,
                connectWallet,
            }}>
            {children}
        </DonationConnection.Provider>
    )

}



