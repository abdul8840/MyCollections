import React, { useState, useEffect } from "react";
import { BsBuildingsFill } from "react-icons/bs";
import { FaMoneyBill1Wave, FaBookOpen } from "react-icons/fa6";
import { MdOutlineWork } from "react-icons/md";
import { FaPlaneDeparture } from "react-icons/fa";
import { Link } from "react-router-dom";
// import './PostList.css';  // Make sure to add your CSS file for styling

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch("/api/country/get");
        if (!response.ok) {
          throw new Error("Failed to fetch posts");
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error.message);
      }
    };

    fetchPosts();
  }, []);

  const handleDelete = async (postId) => {
    try {
      const response = await fetch(`/api/country/delete/${postId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete post");
      }
      // Filter out the deleted post from the state
      setPosts(posts.filter((post) => post._id !== postId));
    } catch (error) {
      console.error("Error deleting post:", error.message);
    }
  };

  // const filteredPosts = posts.filter((post) =>
  //   post.country.toLowerCase().includes(searchTerm.toLowerCase())
  // );

  const filteredPosts = posts.filter((post) => {
    const searchRegex = new RegExp(searchTerm.trim(), 'i');
    return (
      searchRegex.test(post.country) ||
      searchRegex.test(post.currency) ||
      searchRegex.test(post.capital) ||
      searchRegex.test(post.language) ||
      searchRegex.test(post.currency_code) ||
      searchRegex.test(post.region)
    );
  });

  return (
    <div className="main_container">
      <h1 className="main_heading">All Posts</h1>
      <input
        type="text"
        placeholder="Search by country..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="search_input"
      />
      <div className="row">
        {filteredPosts.map((post) => (
          <div key={post._id} className="cards">
            <h3 className="title">{post.country}</h3>
            <img className="list-image" src={post.images[0]} alt="" />
            <p className="card_content">
              <span className="sub-title">
                <BsBuildingsFill /> Capital:
              </span>{" "}
              <span className="content">{post.capital}</span>
            </p>
            <p className="card_content">
              <span className="sub-title">
                <FaMoneyBill1Wave /> Currency:
              </span>{" "}
              <span className="content">{post.currency}</span>
            </p>
            <p className="card_content">
              <span className="sub-title">
                <FaBookOpen /> Language:
              </span>{" "}
              <span className="content">{post.language}</span>
            </p>
            <p className="card_content">
              <span className="sub-title">
                <MdOutlineWork /> Currency Code:
              </span>{" "}
              <span className="content">{post.currency_code}</span>
            </p>
            <p className="card_content">
              <span className="sub-title">
                <FaPlaneDeparture /> Region:
              </span>{" "}
              <span className="content">{post.region}</span>
            </p>
            <div className="btns">
              <button className="btn-delete" onClick={() => handleDelete(post._id)}>Delete</button>
              <Link to={`/post-list/${post._id}`}>
                <button className="btn-view">View</button>
              </Link>
              <Link to={`/edit-post/${post._id}`}>
                <button className="btn-edit">Edit</button>
              </Link>
              
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PostList;
