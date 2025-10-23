import React from 'react'
import { useParams } from "react-router-dom";
import CategoryPage from "./CategoryPage";

export default function CategoryPageWrapper() {
  const { name } = useParams();
  const prefixmap = {grocery: "veg", beauty: "beauty", electronics: "elect", toys: "toy", paintings: "paint"};
  const prefix = prefixmap[name] || name;
  const title = name.charAt(0).toUpperCase() + name.slice(1);
  return <CategoryPage prefix={prefix} title={title} />;
}
