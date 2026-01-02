"use server"

import { getCurrentUser } from "@/app/services/clerk/lib/getCurrentUser";
import { jobInfoFormSchema } from "./schemas";
import { insertJobInfo, updateJobInfo as updatedJobInfoDb } from "./db";
import { redirect } from "next/navigation";
import z from "zod";
import { and, eq } from "drizzle-orm";
import { JobInfoTable } from "@/drizzle/schema/jobInfo";
import { db } from "@/drizzle/db";
import { cacheTag } from "next/cache";
import { getJobInfoIdTag } from "./dbCache";

export async function createJobInfo(unsafeData: z.infer<typeof jobInfoFormSchema>) {
    const { userId } = await getCurrentUser();
    if (userId === null) {
        return { error: true, message: "No permission to do this action" };
    }

    const { success, data } = jobInfoFormSchema.safeParse(unsafeData);
    if (!success) {
        return { error: true, message: "Invalid data submitted" };
    }

    const jobInfo = await insertJobInfo({ ...data, userId });

    redirect(`/app/job-infos/${jobInfo.id}`);
}

export async function updateJobInfo(id: string, unsafeData: z.infer<typeof jobInfoFormSchema>) {
    const { userId } = await getCurrentUser();
    if (userId === null) {
        return { error: true, message: "No permission to do this action" };
    }

    const { success, data } = jobInfoFormSchema.safeParse(unsafeData);
    if (!success) {
        return { error: true, message: "Invalid data submitted" };
    }

    const exisitingJobInfo = await getJobInfo(id, userId);
    if (exisitingJobInfo == null) {
        return { error: true, message: "No permission to do this action" };
    }

    const jobInfo = await updatedJobInfoDb(id, data);

    redirect(`/app/job-infos/${jobInfo.id}`);
}

async function getJobInfo(id: string, userId: string) {
    "use cache";
    cacheTag(getJobInfoIdTag(id));

    return db.query.JobInfoTable.findFirst({
        where: and(
            eq(JobInfoTable.id, id),
            eq(JobInfoTable.userId, userId)
        )
    });

}