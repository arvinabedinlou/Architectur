export default interface HttpDataListener {
  onSuccess(response: { data: any }): void;
  onFailure(message: string): void;
}
