import * as Yup from "yup";

export const MessageSchema = Yup.object()
  .shape({
    message: Yup.string()
      .trim()
      .when("file", {
        is: (file: any) => file !== null, // If file is provided
        then: () => Yup.string().nullable(), // Message can be null or empty
        otherwise: () =>
          Yup.string()
            .required("Message is required")
            .min(1, "Message cannot be empty"), // Message is required otherwise
      }),
    file: Yup.mixed().nullable().notRequired(),
  })
  .test(
    "either-or",
    "Either a message or a file must be provided, but not both.",
    function (value) {
      const { message, file } = value;

      const isMessageProvided = message && message.trim() !== "";
      const isFileProvided = file !== null; // Adjust based on your file upload structure

      // Check that either a message is provided or a file is uploaded, but not both
      if (isMessageProvided && isFileProvided) {
        return this.createError({
          path: "file",
          message: "Only one of message or file should be provided.",
        });
      }

      if (!isMessageProvided && !isFileProvided) {
        return this.createError({
          path: "message",
          message: "Either a message or a file must be provided.",
        });
      }

      return true; // Validation passes if conditions are met
    }
  );;
