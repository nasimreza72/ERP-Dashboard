import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  const [urlList, setUrlList] = useState("");
  const [helperVeribale, setHelperVeriable] = useState(false);
  const [pr, setPr] = useState("");

  //const [url, setUrl] = useState(""); // Using for post request

  const dateRef = useRef("Please add date");
  const dateRef2 = useRef("Please add date");

  function callDatabase() {
    
   setHelperVeriable(true)

    let url = process.env.REACT_APP_API_URL
    fetch(url)
      .then((response) => response.json())
      .then((result) => {

        ////////////// Filtered by Date

        let startDate = new Date(dateRef.current.value ? dateRef.current.value : null); //Date formet (year-month-date)
        let inputDate = new Date(dateRef2.current.value)
        let endDate = new Date(dateRef2.current.value ?

          (inputDate.getUTCMonth() + 1 + "-" + Number(inputDate.getUTCDate()) + "-" + inputDate.getUTCFullYear())
          : new Date());
        // let endDate = new Date(); // will get automatically today's date or else type date manually
          
        let resultProductData = result.filter(order => {
          let date = new Date(order.date_created);
          return (date >= startDate && date <= endDate.setHours(24.00));
        });

        setUrlList(resultProductData)

      });
  }


useEffect(() => {

  //  setHelperVeriable(true)

    let url = process.env.REACT_APP_API_URL
    fetch(url)
      .then((response) => response.json())
      .then((result) => {

        ////////////// Filtered by status
      
        let filteredByStatusData = result.filter(order => {
          return order.status == pr
        });

        ////////////// Filtered by Date

        let startDate = new Date(dateRef.current.value ? dateRef.current.value : null); //Date formet (year-month-date)
        let endDate = new Date(); // will get automatically today's date or else type date manually

        let filteredByDate = filteredByStatusData.filter(order => {
          let date = new Date(order.date_created);
          return (date >= startDate && date <= endDate);
        });

        setUrlList(filteredByDate)

      });
}, [pr] )


  ////// Call database for only completed order

  // function callForCompletedOrderData() {

  //   setHelperVeriable(true)

  //   let url = process.env.REACT_APP_API_URL
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((result) => {

  //       ////////////// Filtered by Date

  //       let startDate = new Date(dateRef.current.value ? dateRef.current.value : null); //Date formet (year-month-date)
  //       let endDate = new Date(); // will get automatically today's date or else type date manually

  //       let getCompletedOrderData = result.filter(order => {
  //         return order.status == pr
  //       });

  //       let getCompletedOrderDataFilteredByDate = getCompletedOrderData.filter(order => {
  //         let date = new Date(order.date_created);
  //         return (date >= startDate && date <= endDate);
  //       });

  //       setUrlList(getCompletedOrderDataFilteredByDate)

  //     });
  // }

    ////// Call database for only processing order

  // function callForProcessingOrderData() {


  //   setHelperVeriable(true)

  //   let url = process.env.REACT_APP_API_URL
  //   fetch(url)
  //     .then((response) => response.json())
  //     .then((result) => {

  //       ////////////// Filtered by Date

  //       let startDate = new Date(dateRef.current.value ? dateRef.current.value : null); //Date formet (year-month-date)
  //       let endDate = new Date(); // will get automatically today's date or else type date manually

  //       let getCompletedOrderData = result.filter(order => {
  //         return order.status == "processing"
  //       });

  //       let getCompletedOrderDataFilteredByDate = getCompletedOrderData.filter(order => {
  //         let date = new Date(order.date_created);
  //         return (date >= startDate && date <= endDate);
  //       });

  //       setUrlList(getCompletedOrderDataFilteredByDate)

  //     });
  // }


  // Send post request

  // if (urlList && helperVeribale == true) {


  //   fetch('http://localhost:3001/api/sendOrderData/', {
  //     method: 'POST', // or 'PUT'
  //     headers: {
  //       'Content-Type': 'application/json',
  //     },
  //     body: JSON.stringify({ "message": urlList }),
  //   })
  //     .then((response) => response.json())
  //     .then((data) => {
  //       console.log('Success:', data.message);
  //     })
  //     .catch((error) => {
  //       console.error('Error:', error);
  //     });

  // }

  // Post request

  // function addToDatabase() {
  //   let sendUrl = {
  //     preSendUrl: url,
  //   };

  //   fetch("http://localhost:3001/api/url/", {
  //     method: "POST",
  //     body: JSON.stringify({ sendUrl }),
  //     headers: { "Content-Type": "application/json" },
  //   })
  //     .then((response) => response.json())
  //     .then((result) => {
  //       if (result.message) {
  //         alert("Url exist")
  //       } else {
  //         alert("successfully added")
  //       }
  //     })
  // }
  console.log("urlList", urlList)

  return (
    <div className="App">
      <header className="App-header">

        <div className="productCount">

          <div className="productCountWrapper productCountWrapper1">
            <div className="productCountWrapperIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M17 5v2a3 3 0 0 1 3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10a3 3 0 0 1 3-3V5h10zm-4 6h-2v2H9v2h1.999L11 17h2l-.001-2H15v-2h-2v-2zm6-9v2H5V2h14z" /></svg>
            </div>
            <div className="productCountWrapperNumber">
              <div>Products</div>
              <div>1,299</div>
            </div>
          </div>

          <div className="productCountWrapper productCountWrapper2">
            <div className="productCountWrapperIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M19 17v2H7v-2s0-4 6-4s6 4 6 4m-3-9a3 3 0 1 0-3 3a3 3 0 0 0 3-3m3.2 5.06A5.6 5.6 0 0 1 21 17v2h3v-2s0-3.45-4.8-3.94M18 5a2.91 2.91 0 0 0-.89.14a5 5 0 0 1 0 5.72A2.91 2.91 0 0 0 18 11a3 3 0 0 0 0-6M7.34 8.92l1.16 1.41l-4.75 4.75l-2.75-3l1.16-1.16l1.59 1.58l3.59-3.58" /></svg>
            </div>
            <div className="productCountWrapperNumber">
              <div>Subscribers</div>
              <div>78</div>
            </div>
          </div>

          <div className="productCountWrapper productCountWrapper3">
            <div className="productCountWrapperIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><g fill="none" stroke="currentColor" stroke-linejoin="round" stroke-width="4"><path d="M41 14L24 4L7 14v20l17 10l17-10V14Z" /><path stroke-linecap="round" d="M24 22v8m8-12v12m-16-4v4" /></g></svg>
            </div>
            <div className="productCountWrapperNumber">
              <div>Sales</div>
              <div>€ 8,599</div>
            </div>
          </div>

          <div className="productCountWrapper productCountWrapper4">
            <div className="productCountWrapperIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 48 48"><mask id="svgIDa"><g fill="none" stroke-linejoin="round" stroke-width="4"><rect width="30" height="36" x="9" y="8" fill="#fff" stroke="#fff" rx="2" /><path stroke="#fff" stroke-linecap="round" d="M18 4v6m12-6v6" /><path stroke="#000" stroke-linecap="round" d="M16 19h16m-16 8h12m-12 8h8" /></g></mask><path fill="currentColor" d="M0 0h48v48H0z" mask="url(#svgIDa)" /></svg>
            </div>
            <div className="productCountWrapperNumber">
              <div>Order</div>
              <div>259</div>
            </div>
          </div>

          <div className="productCountWrapper productCountWrapper5">
            <div className="productCountWrapperIcon">
              <svg xmlns="http://www.w3.org/2000/svg" width="50px" height="50px" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24"><path fill="currentColor" d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z" /></svg>
            </div>
            <div className="productCountWrapperNumber">
              <div>Customers</div>
              <div>237</div>
            </div>
          </div>

        </div>
        <div className="wrapper">

          <div className="buttonList">
            <button onClick={() => callDatabase()}>All Orders</button>
            <button onClick={() => setPr("completed")} >Completed Orders</button>
            <button onClick={() => setPr("processing")}>Processing Orders</button>
            <button onClick={() => setPr("refunded")}>Refunded Orders</button>
            <button onClick={() => setPr("on-hold")}>On Hold Orders</button>
            <button onClick={() => setPr("cancelled")}>Cancelled Orders</button>
            <button onClick={() => setPr("failed")}>Failed Orders</button>
            <button onClick={() => setPr("pending")}>Pending payment</button>
            <button onClick={() => setPr("refunded")}>Checkout draft</button>
          </div>

          <div className="orderTableParent">


            <img className="companyLogo" src="https://henrikk.sg-host.com/two/wp-content/uploads/2022/12/advancedpharmacy.png" alt="Logo" />

            <div className="dateWrapper">
              <p>From</p>
              <input type="date" ref={dateRef}></input>
              <p>Till</p>
              <input type="date" ref={dateRef2}></input>
            </div>

            <table >
              <thead>
                <tr>
                  <th>Order number</th>
                  <th>First name</th>
                  <th>Last name</th>
                  <th>Status</th>
                  <th>Total</th>
                  <th>Order created</th>
                  <th>Order shipped</th>
                </tr>
              </thead>
              <tbody>
                {helperVeribale ?

                  (urlList ? urlList.map((item) =>
                    <tr key={item.id}>
                      <td>{item.id}</td>
                      <td>{item.billing.first_name}</td>
                      <td>{item.billing.last_name}</td>
                      <td>{item.status}</td>
                      <td>€ {item.total}</td>
                      <td>{item.date_created.replace("T", " at ").slice(0, -3)}</td>
                      <td>{item.date_completed ? item.date_completed.replace("T", " at ").slice(0, -3) : item.shipping_status}</td>
                    </tr>) : "Loading ........")

                  : ""}
              </tbody>
            </table>

          </div>

        </div>
      </header>
    </div>
  );
}

export default App;
