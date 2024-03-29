import { useState, useRef, useEffect } from "react";
import Posts from "./components/Posts";
import DashboardHeader from "./components/DashboardHeader.js";
import Pagination from "./components/Pagination";
import DownloadPDF from "./components/download";
import "./App.css";

function App() {
  const [posts, setPosts] = useState([]);
  const [filterdeData, setfilterdeData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const [pr, setPr] = useState("");
  const [helper, setHelper] = useState("");

  const dateRef = useRef("Please add date");
  const dateRef2 = useRef("Please add date");

 const download = (opt) => {
  DownloadPDF.downloadPage(
    "Credit Card – Terms and Condition",
    opt
  ).then((res) => {});
};
  // Get current posts
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);
  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  let url = process.env.REACT_APP_API_URL;
  function callDatabase() {
    setLoading(true);
    fetch(url)
      .then((response) => response.json())
      .then((result) => {
        ////////////// Filtered by Date
        let startDate = new Date(
          dateRef.current.value ? dateRef.current.value : null
        ); //Date formet (year-month-date)
        let inputDate = new Date(dateRef2.current.value);
        let endDate = new Date(
          dateRef2.current.value ? inputDate.getUTCMonth() + 1 + "-" + Number(inputDate.getUTCDate()) + "-" + inputDate.getUTCFullYear() : new Date());
        // let endDate = new Date(); // will get automatically today's date or else type date manually
        let resultProductData = result.filter((order) => {
          let date = new Date(order.date_created);
          return date >= startDate && date <= endDate.setHours(24.0);
        });
        setPosts(resultProductData);
        setLoading(false);
      });
  }

//////////////////// Testing

useEffect(() => {

  fetch("http://localhost:3030/updateDB")

}, [helper]);

   ////////////// Filtered by status

  useEffect(() => {
    setLoading(true);
    setCurrentPage(1);
    fetch(url)
    .then((response) => response.json())
    .then((result) => {
      console.log("result--------------", result)
    let filteredByStatusData = result.filter((order) => {
      return order.status == pr;
    });
    ////////////// Filtered by Date
    let startDate = new Date(
      dateRef.current.value ? dateRef.current.value : null
    ); //Date formet (year-month-date)
    let endDate = new Date(); // will get automatically today's date or else type date manually
    let filteredByDate = filteredByStatusData.filter((order) => {
      let date = new Date(order.date_created);
      return date >= startDate && date <= endDate; });
    setPosts(filteredByDate);
    setLoading(false);
  })
  }, [pr]);

  return (
    <div className="App"  id="pdfDownload" >
      <div className="App-header">
        <DashboardHeader/>
        <div className="wrapper">
          <div className="buttonList">
            <button onClick={() => callDatabase()}>All Orders</button>
            <button onClick={() => setPr("completed")}>Completed Orders</button>
            <button onClick={() => setPr("processing")}> Processing Orders</button>
            <button onClick={() => setPr("refunded")}>Refunded Orders</button>
            <button onClick={() => setPr("on-hold")}>On Hold Orders</button>
            <button onClick={() => setPr("cancelled")}>Cancelled Orders</button>
            <button onClick={() => setPr("failed")}>Failed Orders</button>
            <button onClick={() => setPr("pending")}>Pending payment</button>
            <button onClick={() => setPr("refunded")}>Checkout draft</button>
            <button onClick={() => download("8")}>Download PDF</button> 
          </div>
          <div className="orderTableParent">
            <img className="companyLogo"
              src="https://cdn-icons-png.flaticon.com/512/5332/5332224.png" width={150}
              alt="Logo"/>
            <div className="dateWrapper">
              <div>From</div>
              <input type="date" ref={dateRef}></input>
              <div>Till</div>
              <input type="date" ref={dateRef2}></input>
            </div>
            <Posts posts={currentPosts} loading={loading} filterdeData={filterdeData}/>
            <Pagination postsPerPage={postsPerPage} totalPosts={posts.length} paginate={paginate} />
          </div>
        </div>
      </div>


      <button onClick={() => download("1")}>BlobURL</button> 


    </div>
  );
}
export default App;
