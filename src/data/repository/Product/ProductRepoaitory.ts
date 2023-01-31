import DataListener from "../../DataListener";
import ProductModel from "../../model/ProductModel";

export default interface ProductRepository {
  getProducts(dataListener: DataListener<ProductModel[]>): void;
}
