import React from "react";

// components

import MapExample from "components/Maps/MapExample.js";
import HeaderStats from "components/Headers/HeaderStats";
import CardBarChart from "components/Cards/CardBarChart";
import CardLineChart from "components/Cards/CardLineChart";
import CardStats from "components/Cards/CardStats";
import CardSocialTraffic from "components/Cards/CardSocialTraffic";

export default function Maps() {
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardBarChart />
          </div>
        </div>
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardLineChart />
          </div>
        </div>
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardStats />
          </div>
        </div>
        <div className="w-full px-4">
          <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg rounded">
            <CardSocialTraffic />
          </div>
        </div>
      </div>
    </>
  );
}
