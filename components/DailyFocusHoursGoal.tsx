import { CircularProgressbarWithChildren, buildStyles } from 'react-circular-progressbar';
import {
	areDatesEqual,
	getCurrentDay,
	getFocusDurationFilteredByProjects,
	getFormattedDuration,
} from '../utils/helpers.utils';
import Icon from './Icon';

const CRUCIAL_PROJECTS = {
	LeetCode: true,
	'Side Projects': true,
	'Behavioral Interview Prep': true,
};

const getGoalSeconds = () => {
	const goalForDays = {
		Sunday: 16200,
		Monday: 3600,
		Tuesday: 3600,
		Wednesday: 3600,
		Thursday: 3600,
		Friday: 3600,
		Saturday: 16200,
	};

	const currentDay = getCurrentDay();
	const goalSecondsForToday = goalForDays[currentDay];
	return goalSecondsForToday;
};

const DailyHoursFocusGoal = ({ focusRecords }) => {
	// 18,000 seconds = 5 Hours, the daily goal for number of focus hours per day.
	// TODO: GOAL number of seconds should editable in the "/user-settings" endpoint and that should come from there.
	const GOAL_SECONDS = getGoalSeconds();

	if (!focusRecords) {
		return null;
	}

	const getFocusRecordsFromToday = () => {
		const focusRecordsFromToday = [];

		for (let focusRecord of focusRecords) {
			const isFocusRecordFromToday = areDatesEqual(new Date(focusRecord.startTime), new Date());

			// The array of focus records is sorted in order from start time so the most recent focus records will show up first. This means that today's focus records will show up first - assuming there is any. So, when you get to the first focus record that is not from today, we have found all possible focus records for today. This prevents the loop from going through thousands of records.
			if (!isFocusRecordFromToday) {
				break;
			}

			focusRecordsFromToday.push(focusRecord);
		}

		return focusRecordsFromToday;
	};

	const getTotalFocusDurationToday = () => {
		const focusRecordsFromToday = getFocusRecordsFromToday();
		console.log(focusRecordsFromToday);

		let totalFocusDurationToday = 0;

		focusRecordsFromToday.forEach((focusRecord) => {
			totalFocusDurationToday += getFocusDurationFilteredByProjects(focusRecord, CRUCIAL_PROJECTS);
		});

		return totalFocusDurationToday;
	};

	const getPercentageOfFocusedGoalHours = () => {
		const totalFocusDurationToday = getTotalFocusDurationToday();
		return (totalFocusDurationToday / GOAL_SECONDS) * 100;
	};

	const totalFocusDurationToday = getTotalFocusDurationToday();
	const percentageOfFocusedGoalHours = getPercentageOfFocusedGoalHours();
	const completedGoalForTheDay = percentageOfFocusedGoalHours >= 100;

	return (
		<div>
			<div className="flex justify-end items-center text-orange-500">
				<Icon name="local_fire_department" customClass={'!text-[30px]'} />
				<span className="text-[20px] font-bold">12</span>
			</div>
			<CircularProgressbarWithChildren
				value={getPercentageOfFocusedGoalHours()}
				strokeWidth={3}
				styles={buildStyles({
					textColor: '#4772F9',
					pathColor: completedGoalForTheDay ? '#00cc66' : '#d92323', // Red when overtime, otherwise original color
					trailColor: '#3d3c3c',
				})}
				counterClockwise={true}
				className={completedGoalForTheDay ? 'animated-progress-path' : ''}
			>
				<div
					className="text-white text-[40px] flex justify-center gap-4 w-[100%] select-none cursor-pointer mb-[-10px]"
					onMouseOver={() => {}}
				>
					<div data-cy="timer-display" className="text-center text-[40px]">
						<div className="mt-3">
							{getFormattedDuration(totalFocusDurationToday, false)}
							<span className="">/</span>
							{getFormattedDuration(GOAL_SECONDS, false)}
						</div>

						<div className="text-[22px] mt-[-5px] text-color-gray-100">
							{Number(percentageOfFocusedGoalHours).toFixed(2)}%
						</div>
					</div>
				</div>
			</CircularProgressbarWithChildren>
		</div>
	);
};

export default DailyHoursFocusGoal;
