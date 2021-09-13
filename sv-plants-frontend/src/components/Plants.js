import React, { useState, useContext, useMemo } from "react";
import { AppContext } from "../contextProvider/AppProvider";
import { toast } from "react-toastify";
import Plant from "./Plant";

import "../styles/plant.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Plants = () => {
  const [isFlowOpen, setIsIsFlowOpen] = useState(false);
  const [flowStartTime, setFlowStartTime] = useState(new Date());

  const {
    plants,
    waterPlants,
    selectedPlants,
    getWaterDurationByTimeFormat,
    IN_SECONDS,
  } = useContext(AppContext);

  const loadPLants = (plants) => {
    return plants.map((plant) => <Plant key={plant.Id} plant={plant} />);
  };

  const loadMemoizedPlants = useMemo(() => loadPLants(plants), [plants]);

  const toggleFlowState = () => {
    if (selectedPlants < 1) {
      toast(`Please select atleast one plant to water`, {
        type: "warning",
        autoClose: 3000,
      });
      return;
    }

    setIsIsFlowOpen((isFlowOpen) => {
      return !isFlowOpen;
    });

    return !isFlowOpen;
  };

  const handleWaterPlants = (isFlowOpen) => {
    waterPlants(isFlowOpen);
  };

  const handleCheckWaterDuration = (isFlowOpen) => {
    if (
      isFlowOpen &&
      getWaterDurationByTimeFormat(flowStartTime, new Date(), IN_SECONDS) >= 10
    ) {
      handleWaterPlants(toggleFlowState());
    } else if (!isFlowOpen) {
      setFlowStartTime(new Date());
      handleWaterPlants(toggleFlowState());
    } else if (
      isFlowOpen &&
      getWaterDurationByTimeFormat(flowStartTime, new Date(), IN_SECONDS) <= 10
    ) {
      toast(`Please wait upto 10 seconds while plant is watered!`, {
        type: "warning",
        autoClose: 3000,
      });
    }
  };

  return (
    <div className="w-100">
      <div className="row pb-3">
        <div className="col-3"></div>
        <div className="col-6"></div>
        <div className="col-3">
          <button
            onClick={() => {
              handleCheckWaterDuration(isFlowOpen);
            }}
            className={
              isFlowOpen
                ? "btn btn-danger  justify-content-center"
                : "btn btn-success  justify-content-center"
            }
          >
            <i
              className={
                isFlowOpen ? "fas fa-stop-circle m-1" : "fas fa-play-circle m-1"
              }
            ></i>
            {`Water Selected `}
            <span className="badge badge-light text-dark bg-light">
              {selectedPlants}
            </span>
          </button>
        </div>
      </div>
      {plants.length > 0 && loadMemoizedPlants}
    </div>
  );
};

export default Plants;
