import moment, { Moment } from "moment";
import "moment/locale/pt-br";

// Calculate the time difference from the launch date
export const calculateTimeDifference = (launchDate: string): string => {
    const currentDate: Moment = moment();
    const launchMoment: Moment = moment(launchDate);
    const duration: moment.Duration = moment.duration(currentDate.diff(launchMoment));

    // Display the difference in days, hours, minutes, etc.
    const days: number = duration.days();
    const hours: number = duration.hours();
    const minutes: number = duration.minutes();

    return `${days} days, ${hours} hour, ${minutes} minutes ago`;
};
