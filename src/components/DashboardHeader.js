import React from "react";
import "../../src/App.css";

function DashboardHeader() {

  return (
    <div className="productCount">
      <div className="productCountWrapper productCountWrapper1">
        <div className="productCountWrapperIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M17 5v2a3 3 0 0 1 3 3v11a1 1 0 0 1-1 1H5a1 1 0 0 1-1-1V10a3 3 0 0 1 3-3V5h10zm-4 6h-2v2H9v2h1.999L11 17h2l-.001-2H15v-2h-2v-2zm6-9v2H5V2h14z"
            />
          </svg>
        </div>
        <div className="productCountWrapperNumber">
          <div>Products</div>
          <div>1,299</div>
        </div>
      </div>

      <div className="productCountWrapper productCountWrapper2">
        <div className="productCountWrapperIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M19 17v2H7v-2s0-4 6-4s6 4 6 4m-3-9a3 3 0 1 0-3 3a3 3 0 0 0 3-3m3.2 5.06A5.6 5.6 0 0 1 21 17v2h3v-2s0-3.45-4.8-3.94M18 5a2.91 2.91 0 0 0-.89.14a5 5 0 0 1 0 5.72A2.91 2.91 0 0 0 18 11a3 3 0 0 0 0-6M7.34 8.92l1.16 1.41l-4.75 4.75l-2.75-3l1.16-1.16l1.59 1.58l3.59-3.58"
            />
          </svg>
        </div>
        <div className="productCountWrapperNumber">
          <div>Subscribers</div>
          <div>78</div>
        </div>
      </div>

      <div className="productCountWrapper productCountWrapper3">
        <div className="productCountWrapperIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 48 48"
          >
            <g
              fill="none"
              stroke="currentColor"
              stroke-linejoin="round"
              stroke-width="4"
            >
              <path d="M41 14L24 4L7 14v20l17 10l17-10V14Z" />
              <path stroke-linecap="round" d="M24 22v8m8-12v12m-16-4v4" />
            </g>
          </svg>
        </div>
        <div className="productCountWrapperNumber">
          <div>Sales</div>
          <div>€ 8,599</div>
        </div>
      </div>

      <div className="productCountWrapper productCountWrapper4">
        <div className="productCountWrapperIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 48 48"
          >
            <mask id="svgIDa">
              <g fill="none" stroke-linejoin="round" stroke-width="4">
                <rect
                  width="30"
                  height="36"
                  x="9"
                  y="8"
                  fill="#fff"
                  stroke="#fff"
                  rx="2"
                />
                <path stroke="#fff" stroke-linecap="round" d="M18 4v6m12-6v6" />
                <path
                  stroke="#000"
                  stroke-linecap="round"
                  d="M16 19h16m-16 8h12m-12 8h8"
                />
              </g>
            </mask>
            <path fill="currentColor" d="M0 0h48v48H0z" mask="url(#svgIDa)" />
          </svg>
        </div>
        <div className="productCountWrapperNumber">
          <div>Order</div>
          <div>259</div>
        </div>
      </div>

      <div className="productCountWrapper productCountWrapper5">
        <div className="productCountWrapperIcon">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            preserveAspectRatio="xMidYMid meet"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M12 4a4 4 0 0 1 4 4a4 4 0 0 1-4 4a4 4 0 0 1-4-4a4 4 0 0 1 4-4m0 10c4.42 0 8 1.79 8 4v2H4v-2c0-2.21 3.58-4 8-4Z"
            />
          </svg>
        </div>

        <div></div>

        <div className="productCountWrapperNumber">
          <div>Customers</div>
          <div>237</div>
        </div>
      </div>
    </div>
  );
};

export default DashboardHeader;
