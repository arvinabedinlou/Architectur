import * as React from "react";
import Card from "@mui/material/Card";
import { ChangeEvent, useState, useEffect } from "react";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { Container } from "@mui/system";
import ProductTestService from "./ProductTestService";
import ProductModel from "../../data/model/ProductModel";
import NormalLoading from "../../utils/NormalLoading";
import axios from "axios";
import { Box, Grid } from "@mui/material";

export default function ProductTest() {
  const [loading, setLoading] = useState<boolean>(false);
  const [products, setProducts] = useState<ProductModel[]>([]);
  const [error, setError] = useState<{
    hasError: boolean;
    errorMessage: string;
  }>({ hasError: false, errorMessage: "" });
  const [openAlert, setOpenAlert] = useState<boolean>(false);

  useEffect(() => {
    ProductTestService.getProductList({
      showLoading() {
        setLoading(true);
      },
      hideLoading() {
        setLoading(false);
      },
      showMessage(message) {
        setOpenAlert(true);
        setError({ hasError: true, errorMessage: message });
      },
      onSuccess(data) {
        setOpenAlert(true);
        setError({ hasError: false, errorMessage: "" });
        setProducts(data);
      },
    });
  }, []);
  return (
    <>
      {loading ? (
        <NormalLoading />
      ) : (
        <Box sx={{ display: "flex", marginTop: "30px" }}>
          {products.map((item, index) => {
            return <ProductItem key={index} productItem={item} />;
          })}
        </Box>
      )}
    </>
  );
}
const ProductItem: React.FC<{ productItem: ProductModel }> = ({
  productItem,
}) => {
  return (
    <Box>
      <Card sx={{ maxWidth: 345, marginRight: "20px", marginLeft: "20px" }}>
        <CardMedia
          sx={{ height: 140 }}
          image={`${productItem.image}`}
          title="green iguana"
        />
        <CardContent sx={{ height: "200px" }}>
          <Typography gutterBottom variant="h5" component="div">
            {productItem.category}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {productItem.description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Share</Button>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Box>
  );
};
