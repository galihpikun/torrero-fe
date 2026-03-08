"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";
import {
  Popover,
  PopoverContent,
  PopoverDescription,
  PopoverHeader,
  PopoverTitle,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Ellipsis } from "lucide-react";
import { Separator } from "../ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DialogEditProjects({ projectId, title }) {

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
  });

  function resetForm() {
    setFormData({
      title: "",
    });
  }

  useEffect(() => {
  setFormData({
    title: title || "",
  });
}, [title]);


  function handleInputChanges({ name, value }) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    if (!formData.title) {
      toast.warning("Please fill in all the fields", {
        position: "top-center",
      });
      return;
    }
    try {
      const response = await fetch(`${API_URL}/project/${projectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(response);
        toast.success("Berhasil Mengupdate Project!", {
          position: "top-center",
        });
        resetForm();
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to Update Project, Please try again!", {
        position: "top-center",
      });
    }
  }

  async function deleteProject() {
    const req = await fetch(`${API_URL}/project/${projectId}`,{
            method:"DELETE"
        })
        if (req.ok) {
            router.push('/projects-page');
            toast.success("Berhasil Hapus Project, Anda kembali ke Home!", {position:"top-center"})
        }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost">
            <Ellipsis />
          </Button>
      </PopoverTrigger>
      <PopoverContent className="flex flex-col gap-2">
        <PopoverHeader>
          <PopoverTitle>Add Project</PopoverTitle>
          <PopoverDescription>
            Add your Project over here, Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Est, facilis?.
          </PopoverDescription>
        </PopoverHeader>
        <FieldGroup className="flex flex-col gap-3 mt-2">
          <Field>
            <Label htmlFor="name-1">Project Title</Label>
            <Input
              name="title"
              placeholder="Mandi"
              onChange={(e) => handleInputChanges(e.target)}
              value={formData.title}
            />
          </Field>

          <Button type="submit" onClick={handleSubmit} className="bg-blue-500 hover:bg-blue-400">
            Edit Project
          </Button>
        </FieldGroup>
        <Separator className="text-black"/>
        <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" className="w-full hover:bg-red-400">Delete Project</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button variant="destructive" className="hover:bg-red-400" onClick={deleteProject}>Continue</Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
      </PopoverContent>
    </Popover>
  );
}
