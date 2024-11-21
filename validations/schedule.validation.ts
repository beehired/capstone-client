import * as Yup from "yup";

const validateStartDate = (message: string) =>
  Yup.string()
    .required("Start Date is required")
    .test("is-tomorrow-or-later", message, function (value) {
      const startDate = new Date(value);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1); // Set to tomorrow
      return startDate >= tomorrow;
    });

const validateEndDate = (message: string) =>
  Yup.string()
    .required("End Date is required")
    .test("is-after-startDate", message, function (value) {
      const { startDate } = this.parent;
      const start = new Date(startDate);
      const end = new Date(value);
      // Reset hours for date-only comparison
      start.setHours(0, 0, 0, 0);
      end.setHours(0, 0, 0, 0);
      return end > start;
    });

const validateEndTime = (message: string) =>
  Yup.string()
    .trim()
    .required("End Time is required")
    .test("is-after-or-equal-startTime", message, function (value) {
      const { startDate, startTime, endDate } = this.parent;
      if (startDate === endDate) {
        const startDateTime = new Date(`${startDate}T${startTime}`);
        const endDateTime = new Date(`${endDate}T${value}`);
        return endDateTime >= startDateTime;
      }
      return true; // Allow any time if dates are different
    });

// Shared schema fields
const commonFields = {
  title: Yup.string().required("Topic is required").max(200),
  description: Yup.string(),
  startDate: validateStartDate("Start Date must be tomorrow or later"),
  endDate: validateEndDate("End Date must be after Start Date"),
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
