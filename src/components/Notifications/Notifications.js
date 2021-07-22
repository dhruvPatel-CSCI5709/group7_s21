/**
 * Author: Nikunj Shamjibhai Dhola
 * Description: Global component for handling notification throughtout application
 */
import { notification } from "antd";

const Notification = (type, message, description = "") => {
  return notification[type]({
    message: message,
    description: description,
  });
};

export default Notification;
