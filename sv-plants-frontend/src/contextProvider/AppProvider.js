import React, { useState, useEffect } from "react";
import axios from "axios";
import moment from "moment";
import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

toast.configure();

export const AppContext = React.createContext();

export const AppProvider = (props) => {
  const [plants, setPlants] = useState([]);
  const [triggerPlantsUpdate, setTriggerPlantsUpdate] = useState(false);
  const [selectedPlants, setSelectedPlants] = useState([]);
  const IN_SECONDS = "seconds";
  const IN_HOURS = "hours";
  let startTime = new Date();
  let endTime = new Date();

  useEffect(() => {
    const fetchPlants = async () => {
      try {
        const response = await axios.get("/plants");
        if (response.status === 200) {
          response.data.forEach((plant) => {
            plant.WaterStartTime = moment(new Date(plant.WaterStartTime))
              .utcOffset(-8)
              .format("YYYY-MM-DD HH:mm:ss");

            plant.WaterEndTime = moment(new Date(plant.WaterEndTime))
              .utcOffset(-8)
              .format("YYYY-MM-DD HH:mm:ss");

            plant.WaterDuration = getWaterDurationByTimeFormat(
              plant.WaterStartTime,
              plant.WaterEndTime,
              IN_SECONDS
            );

            if (
              getWaterDurationByTimeFormat(
                plant.WaterStartTime,
                plant.WaterEndTime,
                IN_HOURS
              ) > 6
            ) {
              toast(`Please, water ${plant.PlantName}`, {
                type: "warning",
                autoClose: 100000,
              });
            }
          });
          setPlants(response.data);
        }
      } catch (error) {
        toast("Error fetching plants", {
          type: "error",
          autoClose: 3000,
        });
      }
    };
    fetchPlants();
  }, [triggerPlantsUpdate]);

  const getPlantById = (id) => {
    return plants.filter((plant) => plant.Id === id)[0];
  };

  const getWaterDurationByTimeFormat = (startTime, endTime, timeFormat) => {
    const a = moment(startTime);
    const b = moment(endTime);
    if (timeFormat === "seconds") {
      return moment.duration(b.diff(a)).seconds();
    } else {
      const b = moment(new Date());
      return moment.duration(b.diff(a)).hours();
    }
  };

  const isWaterIntervalValid = (startTime, endTime) => {
    const interval = getWaterDurationByTimeFormat(
      startTime,
      endTime,
      IN_SECONDS
    );
    if (interval > 30) return true;
    else return false;
  };

  const updatePlants = () => {
    setTriggerPlantsUpdate((triggerPlantsUpdate) => {
      return !triggerPlantsUpdate;
    });
  };

  const waterPlant = async (id, isFlowOpen) => {
    const plant = getPlantById(id);
    try {
      if (isFlowOpen) {
        startTime = new Date();
        return;
      }

      endTime = new Date();

      plant.WaterStartTime = startTime;
      plant.WaterEndTime = endTime;
      const response = await axios.put(`/plants/${id}`, plant);
      if (response.status === 204) {
        toast(`${plant.PlantName} has been watered`, {
          type: "success",
          autoClose: 3000,
        });

        updatePlants();
      }
    } catch (error) {
      toast(`Error updating ${plant.PlantName}`, {
        type: "error",
        autoClose: 3000,
      });
    }
  };

  const waterPlants = async (isFlowOpen) => {
    selectedPlants.length > 0 &&
      selectedPlants.map(async (plantId) => {
        await waterPlant(plantId, isFlowOpen);
      });
  };

  const handleSelectedPlant = (id) => {
    selectedPlants.includes(id)
      ? setSelectedPlants((selectedPlants) => {
          return selectedPlants.filter((plantId) => plantId !== id);
        })
      : setSelectedPlants((selectedPlants) => {
          return [...selectedPlants, id];
        });
  };

  return (
    <AppContext.Provider
      value={{
        plants,
        selectedPlants: selectedPlants.length,
        IN_SECONDS,
        updatePlants,
        waterPlant,
        waterPlants,
        handleSelectedPlant,
        getWaterDurationByTimeFormat,
        isWaterIntervalValid,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

export const AppConsumer = AppContext.Consumer;
