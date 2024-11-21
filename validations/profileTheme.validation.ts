import * as Yup from "yup";

export const AddThemeToProfile = Yup.object().shape({
  fontsId: Yup.string().trim().required("Font is required"),
  themeId: Yup.string().trim().required("Theme is required"),
  profileId: Yup.string().trim().required("Profile ID is required"),
});
