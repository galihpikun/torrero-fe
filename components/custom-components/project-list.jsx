import { API_URL } from "@/lib/api";
import { Folder, Image } from "lucide-react";
import Link from "next/link";
import EmptyProjects from "./empty-projects";
import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { DialogAddProjects } from "./add-projects";

export default async function ProjectList() {
  async function getProjects() {
    const res = await fetch(`${API_URL}/project/get-all/`, {
      cache: "no-store",
    });

    const result = await res.json();
    return result.data;
  }

  const projects = await getProjects();

  return (
    <SidebarProvider
      style={{
        "--sidebar-width": "19rem",
      }}>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 px-4 justify-between">
          <div className="flex items-center">
            <SidebarTrigger className="-ml-1" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Take Care Of Your Todos
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Project Lists</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <DialogAddProjects></DialogAddProjects>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-5 pt-0">
          {projects.length == 0 ? (
            <div>
              <EmptyProjects></EmptyProjects>
            </div>
          ) : (
            <div className="flex items-center gap-5 flex-wrap px-10 pt-5">
              {projects.map((project) => (
                <Link
                  className="flex flex-col w-65 h-60 rounded-lg shadow-lg overflow-hidden hover:scale-105 transition-all duration-300"
                  key={project.id}
                  href={`/project/${project.id}`}>
                  <div className="w-full h-2/3 flex flex-col items-center justify-center bg-gray-300">
                    <div className="p-3 bg-gray-400 rounded-lg">
                      <Image size={50} className="text-gray-200" />
                    </div>
                  </div>

                  <div className="w-full h-1/3 bg-white flex items-center gap-2 text-black p-3">
                    <div className="p-2 bg-blue-600 rounded-lg">
                      <Folder className="text-white font-semibold " size={25} />
                    </div>
                    <div>
                      <h1 className="font-medium ">{project.title}</h1>
                      <h2 className="text-sm">
                        Created at{" "}
                        {new Date(project.created_at).toLocaleString("id-ID", {
                          day: "2-digit",
                          month: "long",
                          year: "numeric",
                        })}
                      </h2>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
