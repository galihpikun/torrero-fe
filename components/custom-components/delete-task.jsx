"use client"

import { Trash } from "lucide-react";
import { Button } from "../ui/button";
import { API_URL } from "@/lib/api";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export default function DeleteTask({taskId}) {
    const router = useRouter();
    async function handleButton() {
        const req = await fetch(`${API_URL}/task/${taskId}`,{
            method:"DELETE"
        })
        if (req.ok) {
            router.refresh();
            toast.success("Berhasil Hapus Task", {position:"top-center"})
        }
    }
    return(
        <Button variant="ghost" onClick={handleButton} className="flex items-center gap-2 justify-start text-red-500 hover:bg-red-500 w-full hover:text-white">
            <Trash></Trash> Delete
        </Button>
    )
}