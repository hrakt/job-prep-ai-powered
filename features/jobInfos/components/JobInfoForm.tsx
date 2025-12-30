"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { jobInfoFormSchema } from '../schemas';
import z from "zod"
import { experienceLevels, JobInfoTable } from "@/drizzle/schema/jobInfo"
import { formatExperienceLevel } from "@/features/users/components/lib/formatters"
import { LoadingSwap } from "@/components/ui/loading-swap"
import { createJobInfo, updateJobInfo } from "../actions"
import { toast } from "sonner"


type JobInfoFormValues = z.infer<typeof jobInfoFormSchema>

export function JobInfoForm({ jobInfo }: { jobInfo?: Pick<typeof JobInfoTable.$inferSelect, "id" | "name" | "title" | "experienceLevel" | "description"> }) {
    const form = useForm<JobInfoFormValues>({
        resolver: zodResolver(jobInfoFormSchema),
        defaultValues: jobInfo ?? {
            name: "",
            title: null,
            description: "",
            experienceLevel: "junior",
        },
    })

    async function onSubmit(values: JobInfoFormValues) {
        const action = jobInfo ? updateJobInfo.bind(null, jobInfo.id) : createJobInfo;
        const res = await action(values);
        if (res.error) {
            toast.error(res.message);
        }
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Name</FormLabel>
                            <FormControl>
                                <Input {...field} />
                            </FormControl>
                            <FormDescription>
                                This name is is displayed in the UI for easy indentification.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                    <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Job Title</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        value={field.value ?? ""}
                                        onChange={e => field.onChange(e.target.value || null)}
                                    />
                                </FormControl>
                                <FormDescription>
                                    Option: Only enter if there is a specific job title you are applying for.
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="experienceLevel"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Experience Level</FormLabel>
                                <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                        <SelectTrigger className="w-full">
                                            <SelectValue />
                                        </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                        {experienceLevels.map((level) => (
                                            <SelectItem key={level} value={level}>
                                                {formatExperienceLevel(level)}
                                            </SelectItem>
                                        ))}
                                    </SelectContent>
                                </Select>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>

                <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                                <Textarea
                                    placeholder="A Next.JS 15 and React 19 full stack web developer job that uses Drizzle ORM and Postgres for database managemntent."
                                    className="min-h-[120px]"
                                    {...field}
                                />
                            </FormControl>
                            <FormDescription>
                                Be as specific as possible to get the best results.
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )}
                />

                <Button disabled={form.formState.isSubmitting} type="submit" className="w-full">
                    <LoadingSwap isLoading={form.formState.isSubmitting} > Save Job Information
                    </LoadingSwap>
                </Button>
            </form>
        </Form>
    )
}