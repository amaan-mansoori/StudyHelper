"use client";

import { useEffect, useState } from "react";
import api from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter, CardDescription } from "@/components/ui/card";
import { Badge } from "lucide-react"; // Wait, Badge is usually a component, let's use a div or custom Badge
import { Plus } from "lucide-react";
import Link from "next/link";
import { formatCurrency } from "@/lib/utils";

function StatusBadge({ status }: { status: string }) {
    const styles = {
        open: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400",
        in_progress: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400",
        completed: "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400"
    }[status] || "bg-gray-100 text-gray-700";

    return (
        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold uppercase tracking-wide ${styles}`}>
            {status.replace("_", " ")}
        </span>
    )
}

interface Assignment {
    id: number;
    title: string;
    description: string;
    budget: number;
    status: string;
    owner_id: number;
}

export default function AssignmentsPage() {
    const [assignments, setAssignments] = useState<Assignment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get("/assignments/")
            .then((res) => setAssignments(res.data))
            .catch((err) => console.error(err))
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Assignments</h1>
                    <p className="text-muted-foreground">Find help or earn money by solving assignments.</p>
                </div>
                <Link href="/assignments/post">
                    <Button className="shadow-lg hover:shadow-xl transition-all"><Plus className="mr-2 h-4 w-4" /> Post Assignment</Button>
                </Link>
            </div>

            <div className="space-y-4">
                {loading ? (
                    <p className="text-muted-foreground text-center py-10">Loading assignments...</p>
                ) : assignments.length === 0 ? (
                    <Card className="col-span-full border-dashed p-10 flex flex-col items-center justify-center text-center">
                        <p className="text-muted-foreground mb-4">No assignments active. Post one now!</p>
                        <Link href="/assignments/post">
                            <Button variant="outline">Post Assignment</Button>
                        </Link>
                    </Card>
                ) : (
                    assignments.map((assignment) => (
                        <div key={assignment.id} className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-6 rounded-xl border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md hover:border-primary/20">
                            <div className="space-y-1 mb-4 sm:mb-0">
                                <div className="flex items-center gap-2">
                                    <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">{assignment.title}</h3>
                                    <StatusBadge status={assignment.status} />
                                </div>
                                <p className="text-muted-foreground text-sm line-clamp-1">{assignment.description}</p>
                            </div>
                            <div className="flex items-center gap-6 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="flex items-center text-green-600 font-bold bg-green-50 dark:bg-green-900/20 px-3 py-1 rounded-lg">
                                    {formatCurrency(assignment.budget)}
                                </div>
                                <Button size="sm" variant="outline">View Details</Button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}
