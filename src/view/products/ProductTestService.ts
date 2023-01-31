import DataViewListener from "../../data/DataViewListener";
import ProductModel from "../../data/model/ProductModel";
import ProductRepositoryImpl from "../../data/repository/Product/ProductRepositoryImpl";

class ProductTestService {
  productRepository: ProductRepositoryImpl = new ProductRepositoryImpl();

  getProductList(dataViewListener: DataViewListener<ProductModel[]>): void {
    dataViewListener.showLoading();
    this.productRepository.getProducts({
      onSuccess(data) {
        dataViewListener.hideLoading();
        dataViewListener.onSuccess(data);
      },
      onError(message) {
        dataViewListener.hideLoading();
        dataViewListener.showMessage(message);
      },
    });
  }
}

export default new ProductTestService();
