import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderX } from "lucide-react";
import { DialogAddProjects } from "./add-projects";

export default function EmptyProjects() {
  return (
    <Empty className="bg-gray-200">
      <EmptyHeader>
        <EmptyMedia variant="icon">
          <FolderX></FolderX>
        </EmptyMedia>
        <EmptyTitle>No data</EmptyTitle>
        <EmptyDescription>No data found</EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        <DialogAddProjects></DialogAddProjects>
      </EmptyContent>
    </Empty>
  );
}
