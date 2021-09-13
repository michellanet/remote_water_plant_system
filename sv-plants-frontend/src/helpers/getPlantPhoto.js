import corn_plant from "../assets/images/corn_plant.jpg";
import rubber_plant from "../assets/images/rubber_plant.jpg";
import plumeria_plant from "../assets/images/plumeria_plant.jpg";

const getPlantPhoto = (filename) => {
  switch (filename) {
    case "corn_plant":
      return corn_plant;
    case "rubber_plant":
      return rubber_plant;
    case "plumeria_plant":
      return plumeria_plant;
    default:
      return "undefined";
  }
};

export { getPlantPhoto };
