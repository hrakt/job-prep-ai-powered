import { experienceLevels } from "@/drizzle/schema/jobInfo";
import * as z from "zod"

export const jobInfoFormSchema = z.object({
    name: z.string().min(1, "Required"),
    title: z.string().min(1).nullable(),
    experienceLevel: z.enum(experienceLevels),
    description: z.string().min(1, "Required"),
})
