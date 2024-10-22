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

export const getCurrentDay = () => {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const today = new Date();
	const dayOfWeek = daysOfWeek[today.getDay()];
	return dayOfWeek;
};

export const getDayString = (date) => {
	const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
	const dayOfWeek = daysOfWeek[date.getDay()];
	return dayOfWeek;
};

export const getFormattedLongDay = (inputDate) => {
	return inputDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
};

export const sortObjectByDateKeys = (data) => {
    // Convert object keys (date strings) into an array, sort them based on date comparison
    const sortedKeys = Object.keys(data).sort((a, b) => new Date(a) - new Date(b));

    // Create a new object to store the sorted data
    const sortedData = {};

    // Populate the new object using the sorted keys
    sortedKeys.forEach(key => {
        sortedData[key] = data[key];
    });

    return sortedData;
}

export const getDateMapSinceDay = (startDateStr) => {
    const startDate = new Date(startDateStr);
    const currentDate = new Date();
    const oneDay = 1000 * 60 * 60 * 24; // milliseconds in a day
    const dateMap = {};

    for (let date = startDate; date <= currentDate; date = new Date(date.getTime() + oneDay)) {
        const dateString = date.toLocaleDateString('en-US', {
            month: 'long',
            day: 'numeric',
            year: 'numeric'
        });
        dateMap[dateString] = 0;
    }

    return dateMap;
}