import { notification } from "antd";

const Notification = (
  type,
  message,
  description = "it's a semi functional prototype, this functionality has been implemented with dummy data"
) => {
  return notification[type]({
    message: message,
    description: description,
  });
};

export default Notification;
