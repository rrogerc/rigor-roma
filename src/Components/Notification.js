import { useSelector } from "react-redux";

import { Alert } from "react-bootstrap";

const Notification = () => {
  const { message, status } = useSelector((state) => state.notification);

  if (message === null) return <></>;

  return <Alert variant={status}>{message}</Alert>;
};

export default Notification;
