import type { BaseLayoutProps } from "fumadocs-ui/layouts/shared";

export function baseOptions(): BaseLayoutProps {
  return {
    nav: {
      title: "emailmd",
    },
    githubUrl: "https://github.com/unmta/emailmd",
    links: [
      {
        text: "Docs",
        url: "/docs",
      },
    ],
  };
}
