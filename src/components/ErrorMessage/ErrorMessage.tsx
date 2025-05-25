import React from "react";

type ErrorMessageProps = {
  message: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => (
  <p style={{ textAlign: "center", color: "tomato" }}>{message}</p>
);

export default ErrorMessage;
