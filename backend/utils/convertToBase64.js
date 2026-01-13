import fs from "fs";
import path from "path";

const prodImagePath = path.join("public/images", "default-product.jpg");
const userImagePath = path.join("public/images", "default-user.jpg");

const base64ProdImage = fs.readFileSync(prodImagePath).toString("base64");
const base64UserImage = fs.readFileSync(userImagePath).toString("base64");

const base64Image = {
  product: base64ProdImage,
  user: base64UserImage,
};

export default base64Image;
