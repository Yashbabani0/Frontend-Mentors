import React from "react";

export default function CheckRateCard({
  send,
  receive,
}: {
  send: number;
  receive: number;
}) {
  return <div className="flex items-center justify-center w-max-6xl">
    <h1>Check</h1>
  </div>;
}
