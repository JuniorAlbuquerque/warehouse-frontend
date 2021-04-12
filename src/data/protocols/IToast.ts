export interface ToastMessage {
  type?: "success" | "error" | "warning";
  title: string;
  message: string;
  show?: boolean;
}
