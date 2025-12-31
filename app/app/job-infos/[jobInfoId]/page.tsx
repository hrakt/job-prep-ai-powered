import { BackLink } from "@/components/BackLink"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRightIcon } from "lucide-react"
import Link from "next/link"

const options = [
    {
        label: "Answer Techincal Questions",
        description: "Challenge yourself with practice questions tailored to your job description.",
        href: "questions"
    },
    {
        label: "Practice Interviewing",
        description: "Simulate real interview with Ai powered mock interviews.",
        href: "interview"
    },
    {
        label: "Answer Technical Questions",
        description: "Challenge yourself with practice questions tailored to your job description.",
        href: "questions"
    },
    {
        label: "Refine Your Resume",
        description: "Get expert feedback to make your resume stand out to employers.",
        href: "resume"
    },
    {
        label: "Update Job Description",
        description: "This should only be used for minor updates",
        href: "update"
    },
];

export default async function JobInfoPage({ params }: { params: Promise<{ jobInfoId: string }> }) {
    const { jobInfoId } = await params;
    return (
        <div className="container my-4 space-y-4">
            <BackLink href="/app/">Dashboard</BackLink>
            <header></header>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 has-hover:*:not-hover:opacity-70">
                {options.map(option => (
                    <Link
                        className="hover:scale-[1.02] transition-[transform_opacity]"
                        href={`/app/job-infos/${jobInfoId}/${option.href}`}
                        key={option.href}
                    >
                        <Card className="h-full flex items-start justify-between flex-row">
                            <CardHeader className="flex-grow">
                                <CardTitle>{option.label}</CardTitle>
                                <CardDescription>{option.description}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ArrowRightIcon className="size-6" />
                            </CardContent>
                        </Card>
                    </Link>
                ))}
            </div>
        </div>
    )
}