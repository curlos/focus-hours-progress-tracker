export const getFocusDurationFilteredByProjects = (focusRecord, filteredProjects) => {
	const { tasks } = focusRecord;
	let totalDurationSeconds = 0;

	const filteredTasks = tasks.filter((task) => {
		const taskIsFromFilteredProjects = filteredProjects[task.projectName];
		return taskIsFromFilteredProjects;
	});

	filteredTasks.forEach((task) => {
		const { startTime, endTime } = task;

		// Convert ISO string times to Date objects
		const start = new Date(startTime);
		const end = new Date(endTime);

		// Calculate the total duration in seconds
		const durationSeconds = (end - start) / 1000; // Convert milliseconds to seconds
		totalDurationSeconds += durationSeconds;
	});

	return totalDurationSeconds;
};

export const getFormattedDuration = (duration, includeSeconds = true) => {
	if (!duration) {
		return includeSeconds ? '0h0m0s' : '0h0m';
	}

	const { hours, minutes, seconds } = formatTimeToHoursMinutesSeconds(duration);

	const hoursStr = hours !== 0 ? `${hours.toLocaleString()}h` : '';
	const minutesStr = minutes !== 0 ? `${minutes}m` : '';
	const secondsStr = seconds !== 0 && includeSeconds ? `${seconds}s` : '';

	return `${hoursStr}${minutesStr}${secondsStr}`;
};

export function areDatesEqual(date1: Date | null, date2: Date | null) {
	if (!date1 || !date2) {
		return false;
	}

	const datesEqual =
		date1.getDate() === date2.getDate() &&
		date1.getMonth() === date2.getMonth() &&
		date1.getFullYear() === date2.getFullYear();

	return datesEqual;
}

export function formatTimeToHoursMinutesSeconds(seconds: number) {
	// Extract hours
	const hours = Math.floor(seconds / 3600);
	// Extract remaining minutes after converting to hours
	const minutes = Math.floor((seconds % 3600) / 60);
	// Extract remaining seconds after converting to minutes
	const secondsRemaining = seconds % 60;

	return { hours, minutes, seconds: secondsRemaining };
}