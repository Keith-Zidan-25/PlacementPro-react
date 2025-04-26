import { z } from "zod"

export const peronalDetails = z.object({
    firstName: z.string()
                .min(1,'Please enter your Firstname')
                .regex(/[^A-z]/,'Please enter a valid Name'),
    lastName: z.string()
                .min(1,'Please enter your Lastname')
                .regex(/[^A-z]/,'Please enter a valid Name'),
    phoneNo: z.string()
                .regex(/^\d+$/, 'Please enter valid digits for your phone no.')
                .min(10,'Please enter valid Phone no.'),
    dateOfBirth: z.date(),
    cgpa: z.string()
            .regex(/^\d+$/, 'Please enter a valid CGPA')
            .min(0,'Please Enter a valid CGPA'),
    gender: z.string().min(1,'Please select your Gender')
});