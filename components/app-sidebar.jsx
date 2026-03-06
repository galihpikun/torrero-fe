"use client"

import * as React from "react"
import { ListTodo } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,

} from "@/components/ui/sidebar"
import { usePathname } from "next/navigation"

// This is sample data.
const data = {
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
    },
    {
      title: "Projects",
      url: "/projects-page",
    },
  ],
}

export function AppSidebar({
  ...props
}) {
  const pathname = usePathname()
  return (
    <Sidebar variant="floating" {...props} className="bg-blue-500 p-5">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild >
              <a href="#">
                <div
                  className="bg-blue-200 text-sidebar-primary-foreground flex aspect-square size-8 items-center justify-center rounded-lg">
                  <ListTodo className="text-blue-700"></ListTodo>
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-medium">Finance Tracker</span>
                  <span className="">v1.0.0</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="gap-2">
            {data.navMain.map((item) =>  (              
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild
                isActive={pathname === item.url} className="data-[active=true]:bg-blue-200 data-[active=true]:text-blue-700 data-[active=true]:py-5  transition-all duration-300">
                  <a href={item.url} className="">
                    {item.title}
                  </a>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub className="ml-0 border-l-0 px-1.5" >
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <a href={item.url}>{item.title}</a>
                        </SidebarMenuSubButton>
                      </SidebarMenuSubItem>
                    ))}
                  </SidebarMenuSub>
                ) : null}
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
     
    </Sidebar>
  );
}
