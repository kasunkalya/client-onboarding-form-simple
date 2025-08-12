import { z } from 'zod';

export const onboardingSchema = z.object({
  fullName: z
    .string()
    .min(2, { message: 'Full name must be at least 2 characters' })
    .max(80, { message: 'Full name must be at most 80 characters' })
    .regex(/^[a-zA-Z\s'-]+$/, { message: 'Full name can only contain letters, spaces, apostrophes, or hyphens' })
    .trim(),
  email: z.string().email({ message: 'Invalid email address' }).trim(),
  companyName: z
    .string()
    .min(2, { message: 'Company name must be at least 2 characters' })
    .max(100, { message: 'Company name must be at most 100 characters' })
    .trim(),
  services: z
    .array(z.enum(['UI/UX', 'Branding', 'Web Dev', 'Mobile App']))
    .min(1, { message: 'Select at least one service' }),
  budgetUsd: z
    .number()
    .int({ message: 'Budget must be an integer' })
    .min(100, { message: 'Budget must be at least 100 USD' })
    .max(1000000, { message: 'Budget must be at most 1,000,000 USD' })
    .optional(),
  projectStartDate: z
    .date()
    .refine((date) => date >= new Date(new Date().setHours(0, 0, 0, 0)), {
      message: 'Project start date must be today or later',
    }),
  acceptTerms: z.boolean().refine((val) => val === true, { message: 'You must accept the terms' }),
});

export type OnboardingFormData = z.infer<typeof onboardingSchema>;