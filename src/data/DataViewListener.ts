export default interface DataViewListener<T> {
  onSuccess(data: T): void;
  showLoading(): void;
  hideLoading(): void;
  showMessage(message: string): void;
}
