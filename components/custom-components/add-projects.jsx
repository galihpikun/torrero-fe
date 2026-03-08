"use client";

import { Button } from "@/components/ui/button";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
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

export function DialogAddProjects() {

  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
  });

  function resetForm() {
    setFormData({
      title: "",
    });
  }

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
      const response = await fetch(`${API_URL}/project/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(response);
        toast.success("Berhasil Menambahkan Project!", {
          position: "top-center",
        });
        resetForm();
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to add Project, Please try again!", {
        position: "top-center",
      });
    }
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button className="bg-blue-500 hover:bg-blue-300">Add Project</Button>
      </PopoverTrigger>
      <PopoverContent>
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
        
        <Button type="submit" onClick={handleSubmit} className="bg-blue-500" >
          Add Project
        </Button>
        </FieldGroup>
      </PopoverContent>
    </Popover>
  );
}
