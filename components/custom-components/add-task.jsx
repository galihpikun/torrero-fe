"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { format } from "date-fns";
import { ChevronDownIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { API_URL } from "@/lib/api";

export function DialogAdd({projectId}) {
  const [date, setDate] = useState();
  const router = useRouter();

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    deadline: date,
    status: "todo",
    project_id: parseInt(projectId)
  });

  function resetForm() {
  setFormData({
    title: "",
    description: "",
    priority: "",
    deadline: undefined,
    status: "todo",
    project_id:null
  });
  setDate(undefined);
}

  function handleInputChanges({ name, value }) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    if (!formData.title || !formData.description || !formData.priority) {
      toast.warning("Please fill in all the fields", {
        position: "top-center",
      });
      return;
    }
    try {
      const response = await fetch(`${API_URL}/task/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(response);
        toast.success("Berhasil Menambahkan Task!" ,{position:'top-center'})
        resetForm();
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to add task, Please try again!", {
        position: "top-center",
      });
    }
  }

  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button>
           <Plus></Plus> Add Task
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Add Task</DialogTitle>
            <DialogDescription>
              Add your Task over here, Lorem ipsum dolor sit amet consectetur
              adipisicing elit. Est, facilis?.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <Field>
              <Label htmlFor="name-1">Task Title</Label>
              <Input
                name="title"
                placeholder="Mandi"
                onChange={(e) => handleInputChanges(e.target)}
                value={formData.title}
              />
            </Field>
            <Field>
              <Label htmlFor="username-1">Task Description</Label>
              <Input
                id="username-1"
                name="description"
                placeholder="biar ga bau"
                onChange={(e) => handleInputChanges(e.target)}
                value={formData.description}
              />
            </Field>
            <Field>
              <Label>Priority</Label>
              <Select
                value={formData.priority}
                onValueChange={(value) =>
                  handleInputChanges({ name: "priority", value })
                }>
                <SelectTrigger className="w-45">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="Low" className="text-emerald-400">
                      Low
                    </SelectItem>
                    <SelectItem value="Medium" className="text-yellow-400">
                      Medium
                    </SelectItem>
                    <SelectItem value="High" className="text-red-400">
                      High
                    </SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </Field>
            <Field>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    data-empty={!date}
                    className="data-[empty=true]:text-muted-foreground w-53 justify-between text-left font-normal">
                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                    <ChevronDownIcon />
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(selectedDate) => {
                      setDate(selectedDate);
                      handleInputChanges({
                        name: "deadline",
                        value: selectedDate?.toISOString(),
                      });
                    }}
                  />
                </PopoverContent>
              </Popover>
            </Field>
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button type="submit" onClick={handleSubmit}>
                Save changes
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}
