export default interface DataListener<T> {
  onSuccess(data: T): void;
  onError(message: string): void;
}
