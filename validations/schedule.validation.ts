import * as Yup from "yup";

const validateEndTime = (message: string) =>
  Yup.string()
    .trim()
    .required("End Time is required")
    .test("is-after-startTime", message, function (value) {
      const { startDate, startTime, endDate } = this.parent;

      if (!startDate || !startTime || !endDate || !value) {
        return true;
      }

      const startDateTime = new Date(`${startDate} ${startTime}`);
      const endDateTime = new Date(`${endDate} ${value}`);

      console.log("Start DateTime:", startDateTime);
      console.log("End DateTime:", endDateTime);

      if (isNaN(startDateTime.getTime()) || isNaN(endDateTime.getTime())) {
        return false;
      }

      if (startDate === endDate) {
        return endDateTime > startDateTime;
      }

      return true;
    });

// Shared schema fields
const commonFields = {
  startDate: Yup.string().required("Start Date is required"),
  endDate: Yup.string().required("End Date is required"),
  startTime: Yup.string().trim().required("Start Time is required"),
  endTime: validateEndTime(
    "End Time must be greater than or equal to Start Time if on the same day"
  ),
};

// Create schedule validation schema
export const CreateScheduleValidation = Yup.object().shape({
  ...commonFields,
  duration: Yup.number().required("Duration is required"),
});

// Update schedule validation schema
export const UpdateScheduleValidation = Yup.object().shape({
  scheduleId: Yup.string().required("Schedule ID is required"),
  ...commonFields,
});
