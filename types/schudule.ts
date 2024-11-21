export type ScheduleTypes = {
  input: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    duration: number;
    startTime: string;
    endTime: string;
  };
  senderId: string;
  receiverId: string;
  actkn: string | null;
  applicantId: string;
};

export type UpdateScheduleTypes = {
  scheduleId: string;
  input: {
    title: string;
    description: string;
    startDate: string;
    endDate: string;
    startTime: string;
    endTime: string;
  };
};
