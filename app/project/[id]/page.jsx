import { DialogAdd } from "@/components/custom-components/add-task";
import { DialogEditProjects } from "@/components/custom-components/edit-project";
import TaskList from "@/components/custom-components/task-list";
import { Button } from "@/components/ui/button";
import { API_URL } from "@/lib/api";
import { Ellipsis, ArrowLeft } from "lucide-react";
import Link from "next/link";

export default async function project({ params }) {
  const { id } = await params;
  async function getProject() {
    const res = await fetch(`${API_URL}/project/${id}`, {
      cache: "no-store",
    });

    const result = await res.json();
    return result.data
  }
  const project = await getProject();
  

  return (
    <div className="bg-gray-100 flex flex-col h-screen">
      <nav className="flex justify-between items-center h-18 px-5 shadow-md bg-white w-full py-3">
        <div className="flex gap-2 items-center">
          <Link href="/projects-page">
            <Button variant="ghost">
              <ArrowLeft />
            </Button>
          </Link>
          <h1 className="text-xl font-semibold">{project.title}</h1>
        </div>
        <div className="flex gap-2 items-center">
          <DialogAdd projectId={id}></DialogAdd>
          <DialogEditProjects projectId={id} title={project.title}></DialogEditProjects>
        </div>
      </nav>

      <TaskList project={id} />
    </div>
  );
}
