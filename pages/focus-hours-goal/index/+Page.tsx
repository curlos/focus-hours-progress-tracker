import React from "react";
import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import DailyHoursFocusGoal from "../../../components/DailyFocusHoursGoal.jsx";

export default function Page() {
  const focusRecords = useData<Data>();

  console.log(focusRecords)

  return (
    <div>
      <DailyHoursFocusGoal focusRecords={focusRecords} />
    </div>
  );
}
