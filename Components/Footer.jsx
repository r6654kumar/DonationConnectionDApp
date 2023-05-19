import React from "react";

const Footer = () => {
  const productList = ["Market", "ERC20 Token", "Donation"];
  const contactList = [
    "support@donationconnection.com",
    "info@donationconnection.com",
    "Contact Us",
  ];
  const usefulLink = ["Home", "About Us", "Company Bio"];

  return (
    <>
      <footer className="text-center text-white backgroundMain lg:text-left">
        <div className="mx-6 py-10 text-center md:text-left">
          <div className="grid-1 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                Donation Connection
              </h6>
              <p>
                A crowdfunding website that aims to connect individuals and organizations with causes they care about. It provides a platform for campaign creators to showcase their projects and raise funds from a supportive community. Users can browse various campaigns, donate to their favorite causes, and track the impact of their contributions. Donation Connection fosters a sense of community and empowers individuals to make a difference by supporting meaningful initiatives.
              </p>
            </div>
            <div className="">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                Products
              </h6>
              {productList.map((el, i) => (
                <p className="mb-4" key={i + 1}>
                  <a href="#!">{el}</a>
                </p>
              ))}
            </div>
            <div className="">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                Useful Links
              </h6>
              {usefulLink.map((el, i) => (
                <p className="mb-4" key={i + 1}>
                  <a href="#!">{el}</a>
                </p>
              ))}
            </div>
            <div className="">
              <h6 className="mb-4 flex items-center justify-center font-semibold uppercase md:justify-start">
                Contact
              </h6>
              {contactList.map((el, i) => (
                <p className="mb-4" key={i + 1}>
                  <a href="#!">{el}</a>
                </p>
              ))}
            </div>
          </div>
        </div>
        <div className="backgroundMain p-6 text-center">
          <span>
            © 2023 Copyright
          </span>
          <a href="www.example.com" className="font-semibold">
               <br></br>Rahul Kumar Saw & Anmol Das<br></br>National Institute of Science and Technology(NIST Berhampur)
          </a>
        </div>
      </footer>
    </>
  );
};

export default Footer;
