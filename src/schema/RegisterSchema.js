import * as zod from "zod";

export const registerSchema = zod
  .object({
    name: zod
      .string()
      .nonempty({ message: "Name is required." })
      .min(3, { message: "Name must be at least 3 characters." })
      .max(50, { message: "Name must be at most 50 characters." }),

    email: zod
      .string()
      .nonempty({ message: "Email is required." })
      .regex(/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6})*$/, {
        message: "Invalid email address.",
      }),

    password: zod
      .string()
      .nonempty({ message: "Password is required." })
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        {
          message:
            "Password must be at least 8 characters, include uppercase, lowercase, number and special character.",
        }
      ),

    rePassword: zod.string().nonempty({ message: "re-password is required." }),

    dateOfBirth: zod.coerce
      .date()
      .refine((val) => val < new Date(), {
        message: "Date of birth must be in the past.",
      })
      .refine(
        (val) => {
          const now = new Date();
          const ageDiff = now.getFullYear() - val.getFullYear();
          return ageDiff >= 18;
        },
        { message: "You must be at least 18 years old." }
      ),

    gender: zod
      .string()
      .nonempty("Gender is required.")
      .regex(/^male|female$/, { message: "Invalid gender." }),
  })
  .refine((data) => data.password === data.rePassword, {
    message: "Passwords do not match.",
    path: ["rePassword"],
  });