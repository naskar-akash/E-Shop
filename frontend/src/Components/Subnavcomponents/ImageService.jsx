import { assets } from "../../assets/assets";

export const getImagesByPrefix = (prefix) => {
  return Object.keys(assets)
    .filter((key) => key.startsWith(prefix))
    .map((key) => assets[key]);
};
