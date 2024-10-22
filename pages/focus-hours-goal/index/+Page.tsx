import { useData } from "vike-react/useData";
import type { Data } from "./+data.js";
import DailyHoursFocusGoal from "../../../components/DailyFocusHoursGoal.jsx";

export default function Page() {
  const focusRecords = useData<Data>();

  return (
    <div className="w-screen h-screen bg-color-gray-700 flex justify-center items-center">
      <div className="w-[350px]">
        <DailyHoursFocusGoal focusRecords={focusRecords} />
      </div>
    </div>
  );
}
