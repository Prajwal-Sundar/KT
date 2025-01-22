import * as React from "react";
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
  SidebarRail,
} from "@/components/ui/sidebar";
import Image from "next/image";
import { Link } from "react-scroll";
// This is sample data.
const data = {
  navMain: [
    {
      title: "Bachelor of Science (B.Sc)",
      url: "BachelorofScience",
      items: [
        {
          title: "Introduction",
          url: "Introduction",
        },
        {
          title: "BSc in Aviation",
          url: "BScinAviation",
        },
        {
          title: "BSc in Airline and Airport Management",
          url: "BScinAirlineandAirportManagement",
        },
      ],
    },
    {
      title: "Bachelor Of Business Administration",
      url: "BachelorOfBusinessAdministration",
      items: [
        {
          title: "Introduction",
          url: "Introduction",
        },
        {
          title: "BBA in Airport Managment",
          url: "Bachelor Of Business Administration",
          isActive: true,
        },
        {
          title: "BBA in Aviation",
          url: "Bachelor Of Business Administration",
        },
      ],
    },
    {
      title: "Diploma Courses",
      url: "Diploma Courses",
      items: [
        {
          title: "Diploma in Aviation",
          url: "Diploma Courses",
        },
        {
          title: "Diploma in AirFare",
          url: "Diploma Courses",
        },
        {
          title: "Diploma in Aviation Hospitality",
          url: "Diploma Courses",
        },
        {
          title: "Diploma in Ground Staff",
          url: "Diploma Courses",
        },
      ],
    },
    {
      title: "AME CET",
      url: "AME CET",
      items: [
        {
          title: "Introduction",
          url: "AME CET",
        },
        {
          title: "Courses Offered",
          url: "AME CET",
        },
        {
          title: "Exam Details",
          url: "AME CET",
        },
      ],
    },
  ],
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <a href="#">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg  text-sidebar-primary-foreground">
                  <Image
                    src="/worker.png"
                    alt="worker"
                    height={100}
                    width={100}
                  />
                </div>
                <div className="flex flex-col gap-0.5 leading-none">
                  <span className="font-semibold">Aviation</span>
                  <span className="">Find Your Career</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {data.navMain.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link
                    to={item.url} // Remove all spaces
                    smooth={true}
                    duration={500}
                    className="hover:underline me-4 md:me-6 cursor-pointer"
                    spy={true}
                    containerId="scrollable-container"
                  >
                    {item.title}
                  </Link>
                </SidebarMenuButton>
                {item.items?.length ? (
                  <SidebarMenuSub>
                    {item.items.map((item) => (
                      <SidebarMenuSubItem key={item.title}>
                        <SidebarMenuSubButton asChild isActive={item.isActive}>
                          <Link
                            to={item.url}
                            smooth={true}
                            duration={500}
                            className="hover:underline me-4 md:me-6 cursor-pointer"
                            spy={true}
                            containerId="scrollable-container"
                          >
                            {item.title}
                          </Link>
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
      <SidebarRail />
    </Sidebar>
  );
}
