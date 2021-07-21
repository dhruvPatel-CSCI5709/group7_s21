import { notification } from "antd";

const Notification = (type, message, description = "") => {
  return notification[type]({
    message: message.toString(),
    description: description.toString(),
  });
};

export default Notification;
