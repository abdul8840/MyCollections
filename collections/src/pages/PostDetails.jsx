import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BsBuildingsFill } from "react-icons/bs";
import { FaMoneyBill1Wave, FaBookOpen, FaNfcSymbol, FaLandmark, FaPuzzlePiece } from "react-icons/fa6";
import { MdOutlineWork, MdAddIcCall } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa";
import { BsCurrencyExchange } from "react-icons/bs";
import { BiSolidCoin } from "react-icons/bi";
import { GiIsland } from "react-icons/gi";

const PostDetails = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await fetch(`/api/country/get/${id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch post");
        }
        const data = await response.json();
        setPost(data);
      } catch (error) {
        setErrorMessage(error.message);
        console.error("Error fetching post:", error.message);
      }
    };

    fetchPost();
  }, [id]);

  if (errorMessage) {
    return <div>Error: {errorMessage}</div>;
  }

  if (!post) {
    return <div>Loading...</div>;
  }

  // const currentCountry = post._id;
  // console.log(currentCountry);

  return (
    <div className="main_container2">
      <div className="cont-images">
        <div
          className="background-image"
          style={{
            backgroundImage: `url(${post.images[0]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            width: "100%",
            height: "80vh",
          }}
        >
          <div className="inner-content">
            <img className="flag-image" src={post.images[1]} alt="" />
            <h1 className="title-country">{post.country}</h1>
          </div>
        </div>
        {/* <img className='country-image' src={post.images[0]} alt="" /> */}
      </div>
      {/* <h1 className="title-country">{post.country}</h1> */}
      <div className="content-container">
        <div className="row">
          <p className="detail">
          <BsBuildingsFill className="content-icon" />
            <span className="sub-title-detail">
               Capital
            </span>
            <span className="content-detail">{post.capital}</span>
          </p>
          <p className="detail">
          <BsCurrencyExchange className="content-icon" />
            <span className="sub-title-detail">
               Currency
            </span>
            <span className="content-detail">{post.currency}</span>
          </p>
          <p className="detail">
          <FaBookOpen className="content-icon" />
            <span className="sub-title-detail">
               Language
            </span>
            <span className="content-detail">{post.language}</span>
          </p>
          <p className="detail">
          <MdOutlineWork className="content-icon" />
            <span className="sub-title-detail">
               Currency Code
            </span>
            <span className="content-detail">{post.currency_code}</span>
          </p>
          <p className="detail">
          <FaNfcSymbol className="content-icon" />
            <span className="sub-title-detail">
               Currency Symbol
            </span>
            <span className="content-detail"><img className="symbol-image" src={post.images[2]} alt="$" /></span>
          </p>
          <p className="detail">
          <FaPlaneDeparture className="content-icon" />
            <span className="sub-title-detail">
               Region
            </span>
            <span className="content-detail">{post.region}</span>
          </p>

          <p className="detail">
          <MdAddIcCall className="content-icon" />
            <span className="sub-title-detail">
               ISD Code
            </span>
            <span className="content-detail">{post.isd_code}</span>
          </p>
          <p className="detail">
          <FaLandmark className="content-icon" />
            <span className="sub-title-detail">
               Land Area
            </span>
            <span className="content-detail">{post.land} km<sup>2</sup></span>
          </p>
          <p className="detail">
          <FaPuzzlePiece className="content-icon" />
            <span className="sub-title-detail">
               Monetary System
            </span>
            <span className="content-detail">{post.monetary}</span>
          </p>

          <p className="detail">
          <FaMoneyBill1Wave className="content-icon" />
            <span className="sub-title-detail">
               Banknotes
            </span>
            <span className="content-detail">{post.banknote}</span>
          </p>
          <p className="detail">
          <BiSolidCoin className="content-icon" />
            <span className="sub-title-detail">
               Coins
            </span>
            <span className="content-detail">{post.coin}</span>
          </p>
          <p className="detail">
          <GiIsland className="content-icon" />
            <span className="sub-title-detail">
               No. Of Islands
            </span>
            <span className="content-detail">{post.island}</span>
          </p>
          
        </div>
        <div className="map-heading">
          <h2>Map of {post.country}</h2>
        </div>
        <div className="map">
          <img className="map-image" src={post.images[3]} alt="$" />
        </div>
      </div>

      {/* {post.region === 'Asia' ? "Hello" : "Bye"} */}
      
    </div>
  );
};

export default PostDetails;
