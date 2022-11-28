import { useState } from "react";
import "./App.css";

function App() {
  const [urlList, setUrlList] = useState("");
  const [url, setUrl] = useState("");

  function callDatabase() {
   // let url = "http://localhost:3001/api/getUrl/";
   let url = "https://staging31.henrikk.sg-host.com/two/en/wp-json/wc/v3/orders?consumer_key=ck_b51b515df3f1dad1e258662058d23e36d856f673&consumer_secret=cs_17ca613d0bb25fcd36852fb305a4e14925c2be08";

    fetch(url)
      .then((response) => response.json())
      .then((result) => setUrlList(result));
  } 

  function addToDatabase() {
    let sendUrl = {
      preSendUrl: url,
    };

    fetch("http://localhost:3001/api/url/", {
      method: "POST",
      body: JSON.stringify({ sendUrl }),
      headers: { "Content-Type": "application/json" },
    })
    .then((response) => response.json())
      .then((result) => {
        if(result.message){
          alert("Url exist")
        }else{
          alert("successfully added")
        }
      })  
  }

  console.log("urlList", urlList);

  return (
    <div className="App">
      <header className="App-header">
      <img src="https://lcmed.de/wp-content/uploads/2022/10/logo-300x100-1.png" alt="Logo" />
        <h3 className="erp-dashboard"> ERP Dashboard</h3>
        <button onClick={() => callDatabase()}>Get order data</button>
        <ol> {urlList ? urlList.map((item) =>
           <li> 
            
            { "Order id -" +  item.id + ", Status - " + item.status + ", Total - "+ item.total + " €," + " Order Created - " + item.date_created + ", Order Shipped - " + item.date_completed}

           </li>

           ) : ""} 
        </ol>
      </header>
    </div>
  );
}

export default App;
