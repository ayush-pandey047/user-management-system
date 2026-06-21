import { z } from 'zod';

const PAN_REGEX = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
const AADHAAR_REGEX = /^[0-9]{12}$/;
const MOBILE_REGEX = /^[0-9]{10}$/;

export const userFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(150),
  email: z.string().email('Invalid email format'),
  primaryMobile: z.string().regex(MOBILE_REGEX, 'Must be exactly 10 digits'),
  secondaryMobile: z
    .string()
    .regex(MOBILE_REGEX, 'Must be exactly 10 digits')
    .optional()
    .or(z.literal('')),
  aadhaar: z.string().regex(AADHAAR_REGEX, 'Must be exactly 12 digits'),
  pan: z.string().regex(PAN_REGEX, 'Format must be ABCDE1234F'),
  dateOfBirth: z.string().min(1, 'Date of birth is required'),
  placeOfBirth: z.string().min(2, 'Required').max(150),
  currentAddress: z.string().min(5, 'Address is too short'),
  permanentAddress: z.string().min(5, 'Address is too short'),
});

export type UserFormValues = z.infer<typeof userFormSchema>;