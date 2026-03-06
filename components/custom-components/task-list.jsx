import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import {
  LayoutList,
  CalendarClock,
  LoaderCircle,
  CheckCircle,
  EllipsisVertical,
} from "lucide-react";
import { DialogTask } from "./edit-task";
import { API_URL } from "@/lib/api";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import DeleteTask from "./delete-task";

export default async function TaskList({project}) {
  // Fetching data
  // json biar ngubah jadi json object, ngedestructure.
  async function getTasks() {
    const res = await fetch(`${API_URL}/task/get-all/${project}`, {
      cache: "no-store",
    });

    const result = await res.json();
    return result.data;
  }

  const tasks = await getTasks();

  // filtering status
  const todoTasks = tasks.filter((task) => task.status === "todo");
  const inProgressTasks = tasks.filter((task) => task.status === "in_progress");
  const doneTasks = tasks.filter((task) => task.status === "done");

  return (
    <section className="h-full flex justify-around items-start flex-wrap p-8 w-screen gap-10">
      <div className="w-80 flex flex-col gap-5">
        <div className="flex gap-2 items-center bg-white rounded-xl shadow-md py-2 w-full px-3">
          <LayoutList size={20} />
          <h2 className="text-lg font-medium">To Do</h2>
        </div>
        <ScrollArea className="w-full p-3 h-130 pr-4 bg-gray-300 rounded-xl shadow-md">
          <div className="flex flex-col gap-3">
            {todoTasks.map((task) => (
              <Card className="" key={task.id}>
                <div className="flex justify-between pr-4">
                  <CardContent>
                    <h1 className="font-semibold">{task.title}</h1>
                    <p className="text-gray-500 pt-1">{task.description}</p>
                  </CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline"><EllipsisVertical/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel><DialogTask taskId={task.id} /></DropdownMenuLabel>
                        <DropdownMenuLabel><DeleteTask taskId={task.id}/></DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Separator />
                <CardFooter>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <CalendarClock size={18} color="gray" />
                      <p className="text-gray-500 text-sm font-semibold">
                        {new Date(task.deadline).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div
                      className={`font-semibold text-sm text-white px-2 py-1 rounded-full ${task.priority == "High" ? "bg-red-500" : task.priority == "Medium" ? "bg-yellow-500" : "bg-gray-600"} `}>
                      {task.priority}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-80 flex flex-col gap-5">
        <div className="flex gap-2 items-center bg-white rounded-xl shadow-md py-2 w-full px-3">
          <LoaderCircle size={20} />
          <h2 className="text-lg font-medium">In Progress</h2>
        </div>
        <ScrollArea className="w-full p-3 h-130 bg-yellow-200 rounded-xl shadow-md">
          <div className="flex flex-col gap-3">
            {inProgressTasks.map((task) => (
              <Card className="" key={task.id}>
                <div className="flex justify-between pr-4">
                  <CardContent>
                    <h1 className="font-semibold">{task.title}</h1>
                    <p className="text-gray-500 pt-1">{task.description}</p>
                  </CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline"><EllipsisVertical/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel><DialogTask taskId={task.id} /></DropdownMenuLabel>
                        <DropdownMenuLabel><DeleteTask taskId={task.id}/></DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Separator />
                <CardFooter>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <CalendarClock size={18} color="gray" />
                      <p className="text-gray-500 text-sm font-semibold">
                        {new Date(task.deadline).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div
                      className={`font-semibold text-sm text-white px-2 py-1 rounded-full ${task.priority == "High" ? "bg-red-500" : task.priority == "Medium" ? "bg-yellow-500" : "bg-gray-600"} `}>
                      {task.priority}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
      <div className="w-80 flex flex-col gap-5">
        <div className="flex gap-2 items-center bg-white rounded-xl shadow-md py-2 w-full px-3">
          <CheckCircle size={20} />
          <h2 className="text-lg font-medium">Done</h2>
        </div>
        <ScrollArea className="w-full p-3 h-130 bg-green-300 rounded-xl shadow-md">
          <div className="flex flex-col gap-3">
            {doneTasks.map((task) => (
              <Card className="" key={task.id}>
                <div className="flex justify-between pr-4">
                  <CardContent>
                    <h1 className="font-semibold">{task.title}</h1>
                    <p className="text-gray-500 pt-1">{task.description}</p>
                  </CardContent>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline"><EllipsisVertical/></Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                        <DropdownMenuLabel><DialogTask taskId={task.id} /></DropdownMenuLabel>
                        <DropdownMenuLabel><DeleteTask taskId={task.id}/></DropdownMenuLabel>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <Separator />
                <CardFooter>
                  <div className="flex justify-between items-center w-full">
                    <div className="flex items-center gap-2">
                      <CalendarClock size={18} color="gray" />
                      <p className="text-gray-500 text-sm font-semibold">
                        {new Date(task.deadline).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                    <div
                      className={`font-semibold text-sm text-white px-2 py-1 rounded-full ${task.priority == "High" ? "bg-red-500" : task.priority == "Medium" ? "bg-yellow-500" : "bg-gray-600"} `}>
                      {task.priority}
                    </div>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
        </ScrollArea>
      </div>
    </section>
  );
}
