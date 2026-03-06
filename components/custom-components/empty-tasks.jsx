import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { FolderX } from "lucide-react";
import { DialogAdd } from "./add-task";

export default function EmptyTasks() {
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
        <DialogAdd></DialogAdd>
      </EmptyContent>
    </Empty>
  );
}
