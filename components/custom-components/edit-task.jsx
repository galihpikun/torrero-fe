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
import { Loader, Pencil, UserPlus } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState, useEffect } from "react";
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

export function DialogTask({ taskId }) {
    const [open, setOpen] = useState(false);
  const [date, setDate] = useState();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "",
    deadline: date,
    status: "",
  });

  useEffect(() => {
  if (open && taskId) {
    fetchTaskData();
  }
}, [open]);

  async function fetchTaskData() {
    setLoading(true);
    try {
      const response = await fetch(`${API_URL}/task/${taskId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        const jsonData = await response.json();
        const data = jsonData.data;

        const deadlineDate = data.deadline
          ? new Date(data.deadline)
          : undefined;

        setDate(deadlineDate);

        setFormData({
          title: data.title || "",
          description: data.description || "",
          priority: data.priority || "",
          deadline: deadlineDate?.toISOString(),
          status: data.status || "todo",
        });
      }
    } catch (error) {
      console.error("Error fetching task data:", error);
      toast.error("Error fetching task data");
    } finally {
      setLoading(false);
    }
  }

  function handleInputChanges({ name, value }) {
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  async function handleSubmit() {
    if (
      !formData.title ||
      !formData.description ||
      !formData.priority ||
      !formData.deadline
    ) {
      toast.warning("Please fill in all the fields", {
        position: "top-center",
      });
      return;
    }
    try {
      const response = await fetch(`${API_URL}/task/${taskId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        console.log(response);
        toast.success("Berhasil Edit Task!", { position: "top-center" });
        fetchTaskData();
        router.refresh();
      }
    } catch (error) {
      toast.error("Failed to edit task, Please try again!", {
        position: "top-center",
      });
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className='w-full flex items-center justify-start' variant="ghost">
          <Pencil /> Edit
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
        {loading ? (
            <div className="justify-center flex flex-col items-center h-40 w-full">
                <div className="flex items-center gap-2">
                    <Loader size={15} className="animate-spin"/>
                    <h1>Loading... Please Wait</h1>
                </div>
            </div>
        ) : (
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
            <Label>Status</Label>
            <Select
              value={formData.status}
              onValueChange={(value) =>
                handleInputChanges({ name: "status", value })
              }>
              <SelectTrigger className="w-45">
                <SelectValue placeholder="Priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="todo" className="text-red-400">
                    Todo
                  </SelectItem>
                  <SelectItem value="in_progress" className="text-yellow-400">
                    In Progress
                  </SelectItem>
                  <SelectItem value="done" className="text-green-400">
                    Done
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
        )}
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline">Cancel</Button>
          </DialogClose>
          <DialogClose asChild>
            <Button type="submit" onClick={handleSubmit} disabled={loading}>
              Save changes
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
