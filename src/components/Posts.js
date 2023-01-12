import React from "react";
import "./style.css"

const Posts = ({ posts, loading, filterdeData }) => {
  if (loading) {
  return <span class="loader"></span>
  }


  return (
    <>
    <div className="list-group mb-4">
      <table>
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
          { posts &&
            posts.map((item) => (
              <tr key={item.id}>
                <td>{item.id}</td>
                <td>{item.billing.first_name}</td>
                <td>{item.billing.last_name}</td>
                <td>{item.status}</td>
                <td>€ {item.total}</td>
                <td>{item.date_created.replace("T", " at ").slice(0, -3)}</td>
                <td>
                  {item.date_completed
                    ? item.date_completed.replace("T", " at ").slice(0, -3)
                    : item.shipping_status}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
      
    </div>
    </> );
};

export default Posts;