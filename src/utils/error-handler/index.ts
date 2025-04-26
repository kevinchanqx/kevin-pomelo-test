import { APIGatewayProxyResultV2 } from "aws-lambda";
import { HttpStatusCode } from "axios";

export type ThrownErrorPayload = {
  statusCode: HttpStatusCode;
  data?: Record<string, unknown> | unknown[];
  message: string;
};

export type ThrownError = ThrownErrorPayload & {
  name: "ThrownError";
};

export const throwError = ({
  statusCode,
  data,
  message,
}: ThrownErrorPayload) => {
  console.error("[ThrownError]", {
    statusCode,
    data,
    message,
  });

  throw { statusCode, data, message, name: "ThrownError" };
};

export const isThrownError = (error: unknown): error is ThrownError => {
  return (
    typeof error === "object" &&
    error !== null &&
    "statusCode" in error &&
    "message" in error &&
    "name" in error &&
    error.name === "ThrownError"
  );
};

export const catchErrorHandler = (err: unknown): APIGatewayProxyResultV2 => {
  if (isThrownError(err)) {
    return {
      statusCode: err.statusCode,
      body: JSON.stringify({ message: err.message, data: err.data }),
    };
  }

  if (err instanceof Error) {
    console.error("[Error]", {
      message: err.message,
      stack: err.stack,
      name: err.name,
    });
    return {
      statusCode: HttpStatusCode.InternalServerError,
      body: JSON.stringify({ message: err.message }),
    };
  }

  console.error("[Unknown Error]", err);
  return {
    statusCode: HttpStatusCode.InternalServerError,
    body: JSON.stringify({ message: "Internal Server Error" }),
  };
};
