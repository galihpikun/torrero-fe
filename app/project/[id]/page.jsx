import { DialogAdd } from "@/components/custom-components/add-task";
import TaskList from "@/components/custom-components/task-list";
import { Button } from "@/components/ui/button";
import {Ellipsis,
  UserPlus,
  ArrowLeft,} from "lucide-react"
import Link from "next/link";

export default async function project({params}) {
  const {id} = await params;

  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <nav className="flex justify-between items-center h-18 px-5 shadow-md bg-white w-full py-3">
        <div className="flex gap-2 items-center">
          <Link href="/projects-page">
          <Button variant="ghost">
            
            <ArrowLeft />
          </Button>
          </Link>
          <h1 className="text-xl font-semibold">Project name</h1>
        </div>
        <div className="flex gap-2 items-center">
          <DialogAdd projectId={id}></DialogAdd>
          <Button variant="ghost">
            <Ellipsis />
          </Button>
        </div>
      </nav>

      <TaskList project={id} />
    </div>
  );
}
