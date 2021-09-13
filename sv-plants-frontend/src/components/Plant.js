import React, { useState, useContext } from "react";
import { getPlantPhoto } from "../helpers/getPlantPhoto";
import { AppContext } from "../contextProvider/AppProvider";
import moment from "moment";
import { toast } from "react-toastify";

import "../styles/plant.css";
import "react-toastify/dist/ReactToastify.css";

toast.configure();

const Plant = (props) => {
  const {
    handleSelectedPlant,
    waterPlant,
    isWaterIntervalValid,
    getWaterDurationByTimeFormat,
    IN_SECONDS,
  } = useContext(AppContext);

  const [isFlowOpen, setIsIsFlowOpen] = useState(false);
  const [flowStartTime, setFlowStartTime] = useState(new Date());
  const [isSelected, setIsSelected] = useState(false);

  const handleClickedPlant = (id) => {
    if (
      isSelected === false &&
      isWaterIntervalValid(props.plant.WaterEndTime, new Date()) === false
    ) {
      toast(`Please wait upto 30 seconds to water plant again!`, {
        type: "warning",
        autoClose: 3000,
      });
      return;
    }
    setIsSelected((isSelected) => {
      return !isSelected;
    });
    handleSelectedPlant(id);
  };

  const toggleFlowState = () => {
    setIsIsFlowOpen((isFlowOpen) => {
      return !isFlowOpen;
    });
    return !isFlowOpen;
  };

  const handleWaterPlant = (id, isFlowOpen) => {
    waterPlant(id, isFlowOpen);
  };

  const handleWaterIntervalCheck = (startTime, endTime) => {
    if (
      isFlowOpen &&
      getWaterDurationByTimeFormat(flowStartTime, new Date(), IN_SECONDS) >= 10
    ) {
      handleWaterPlant(props.plant.Id, toggleFlowState());
    } else if (
      isFlowOpen &&
      getWaterDurationByTimeFormat(flowStartTime, new Date(), IN_SECONDS) <= 10
    ) {
      toast(`Please wait upto 10 seconds while plant is watered!`, {
        type: "warning",
        autoClose: 3000,
      });
    } else if (!isFlowOpen && isWaterIntervalValid(startTime, endTime)) {
      setFlowStartTime(new Date());
      handleWaterPlant(props.plant.Id, toggleFlowState());
    } else {
      toast(`Please wait upto 30 seconds to water plant again!`, {
        type: "warning",
        autoClose: 3000,
      });
    }
  };

  return (
    <div
      className={
        isSelected
          ? "row plant shadow p-3 mb-5 bg-body rounded border border-3 border-secondary"
          : "row plant shadow p-3 mb-5 bg-body rounded"
      }
    >
      <div
        onClick={() => handleClickedPlant(props.plant.Id)}
        className="col-md-3 text-center"
      >
        <img
          src={getPlantPhoto(props.plant.PlantPhotoFileName)}
          className="plant-photo img-thumbnail rounded"
          alt={props.plant.PlantName}
        />
      </div>
      <div
        onClick={() => handleClickedPlant(props.plant.Id)}
        className="col-md-6"
      >
        <div className="row">
          <p className="h2 text-center">{props.plant.PlantName}</p>
          <table className="table table-borderless">
            <tbody>
              <tr>
                <td className="fs-5">Last Watered :</td>
                <td>
                  {moment(props.plant.WaterStartTime).format(
                    "dddd, MMMM Do YYYY, h:mm:ss a"
                  )}
                </td>
              </tr>
              <tr>
                <td className="fs-5">Last Water Duration: </td>
                <td>{`${props.plant.WaterDuration} second(s)`}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
      <div className="col-md-3 p-5">
        <button
          onClick={() => {
            handleWaterIntervalCheck(props.plant.WaterEndTime, new Date());
          }}
          className={isFlowOpen ? "btn btn-danger" : "btn btn-success"}
        >
          <i
            className={
              isFlowOpen ? "fas fa-stop-circle m-1" : "fas fa-play-circle m-1"
            }
          ></i>
          Water
        </button>
      </div>
    </div>
  );
};

export default Plant;
