import { DialogAdd } from "@/components/custom-components/add-task";
import TaskList from "@/components/custom-components/task-list";
import { Button } from "@/components/ui/button";
import {Ellipsis,
  UserPlus,
  ArrowLeft,} from "lucide-react"

export default async function project() {
  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <nav className="flex justify-between items-center h-18 px-5 shadow-md bg-white w-full">
        <div className="flex gap-2 items-center">
          <Button variant="ghost">
            <ArrowLeft />
          </Button>
          <h1 className="text-xl font-semibold">Project name</h1>
        </div>
        <div className="flex gap-2 items-center">
          <DialogAdd></DialogAdd>
          <Button variant="ghost">
            <Ellipsis />
          </Button>
        </div>
      </nav>

      <TaskList/>
    </div>
  );
}
