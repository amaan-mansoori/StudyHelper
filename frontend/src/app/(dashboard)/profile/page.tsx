"use client";

import { useAuthStore } from "@/lib/store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function ProfilePage() {
    const { user } = useAuthStore();

    return (
        <div className="max-w-2xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold">My Profile</h1>
                <p className="text-gray-500">Manage your account settings</p>
            </div>

            <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow space-y-4">
                <div className="flex items-center space-x-4">
                    <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center text-3xl font-bold text-primary">
                        {user?.full_name?.charAt(0) || "U"}
                    </div>
                    <div>
                        <h2 className="text-xl font-semibold">{user?.full_name}</h2>
                        <p className="text-gray-500">{user?.email}</p>
                    </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Full Name</label>
                        <Input defaultValue={user?.full_name} disabled />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">College</label>
                        <Input defaultValue={user?.college} disabled />
                    </div>
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Email</label>
                        <Input defaultValue={user?.email} disabled />
                    </div>
                </div>

                <div className="pt-4">
                    <Button variant="outline">Edit Profile (Coming Soon)</Button>
                </div>
            </div>
        </div>
    );
}
