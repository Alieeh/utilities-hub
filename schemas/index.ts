import * as z from 'zod';


export const LoginSchema = z.object({
    email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address")
    .max(40, "Email must be at most 40 characters"),

    password: z
    .string()
    .nonempty("Password is required")
    .max(30, "Password must be at most 30 characters"),

    code: z.
    optional(z.string()),
});


export const RegisterSchema = z.object({
    name: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters")
    .max(20, "Username must be at most 20 characters")
    .regex(/^[a-zA-Z0-9_ ]+$/, "Username can only contain letters, numbers, underscores, and spaces"),

    email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address")
    .max(40, "Email must be at most 40 characters"),

    password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters")
    .superRefine((password, ctx) => {
        if (!/[A-Z]/.test(password)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one UPPERCASE letter",
          });
        }
        if (!/[a-z]/.test(password)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one lowercase letter",
          });
        }
        if (!/^[A-Za-z\d@$!%*?&]+$/.test(password)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password contains invalid characters",
          });
        }
        // Special characters are optional: no error if missing
      }),


    confirmPassword: z
    .string()
    .nonempty("Please confirm your password")
    .max(50, "Waddddaafuk bruhhhh!"),

}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });



export const ResetSchema = z.object({
    email: z
    .string()
    .nonempty("Email is required")
    .email("Invalid email address")
    .max(40, "Email must be at most 40 characters"),
});


export const NewPasswordSchema = z.object({
    password: z
    .string()
    .nonempty("Password is required")
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must be at most 30 characters")
    .superRefine((password, ctx) => {
        if (!/[A-Z]/.test(password)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one UPPERCASE letter",
          });
        }
        if (!/[a-z]/.test(password)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password must contain at least one lowercase letter",
          });
        }
        if (!/^[A-Za-z\d@$!%*?&]+$/.test(password)) {
          ctx.addIssue({
            code: z.ZodIssueCode.custom,
            message: "Password contains invalid characters",
          });
        }
        // Special characters are optional: no error if missing
      }),

    confirmPassword: z
    .string()
    .nonempty("Please confirm your password")
    .max(40, "Waddddaafuk bruhhhh!"),

}).superRefine((data, ctx) => {
    if (data.password !== data.confirmPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });