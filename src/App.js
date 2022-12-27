import { useState, useRef } from "react";
import "./App.css";

function App() {
  const [urlList, setUrlList] = useState("");
  const [helperVeribale, setHelperVeriable] = useState(false);
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

  ////// Call database for only completed order

  function callForCompletedOrderData() {

    setHelperVeriable(true)

    let url = process.env.REACT_APP_API_URL
    fetch(url)
      .then((response) => response.json())
      .then((result) => {

        ////////////// Filtered by Date

        let startDate = new Date(dateRef.current.value ? dateRef.current.value : null); //Date formet (year-month-date)
        let endDate = new Date(); // will get automatically today's date or else type date manually

        let getCompletedOrderData = result.filter(order => {
          return order.status == "completed"
        });

        let getCompletedOrderDataFilteredByDate = getCompletedOrderData.filter(order => {
          let date = new Date(order.date_created);
          return (date >= startDate && date <= endDate);
        });

        setUrlList(getCompletedOrderDataFilteredByDate)

      });
  }

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
  // console.log("urlList", urlList)

  return (
    <div className="App">
      <header className="App-header">
        <img src="https://henrikk.sg-host.com/two/wp-content/uploads/2022/12/advancedpharmacy.png" alt="Logo" />
        <div className="dateWrapper">
          <strong>From</strong>
          <input type="date" ref={dateRef}></input>
          <strong>Till</strong>
          <input type="date" ref={dateRef2}></input>
        </div>

        <div className="buttonList">
          <button onClick={() => callDatabase()}>Get all order data</button>
          <button onClick={() => callForCompletedOrderData()}>Delivered order data</button>
        </div>

        <div className="orderTableParent">

          <table cellPadding="0" cellSpacing="0">
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
                    <td>{item.total}</td>
                    <td>{item.date_created.replace("T", " at ")}</td>
                    <td>{item.date_completed ? item.date_completed.replace("T", " at ") : item.shipping_status}</td>
                  </tr>) : "Loading ........")
                : ""}
            </tbody>
          </table>

        </div>
      </header>
    </div>
  );
}

export default App;
