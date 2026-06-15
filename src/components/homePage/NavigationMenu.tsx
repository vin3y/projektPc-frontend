"use client";

import * as React from "react";
import { Button } from "../../../@/components/ui/button";
import { Field } from "../../../@/components/ui/field";
import { Input } from "../../../@/components/ui/input";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "../../../@/components/ui/navigation-menu";
import { Link } from "react-router";
import { getInputSuggesions } from "@/services/listings/listing";
import { useDispatch } from "react-redux";
import { setInputSuggestions } from "@/store/slices/inputSuggesionSlice";
import { useAppSelector } from "@/store/hooks";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Alert Dialog",
    href: "/docs/primitives/alert-dialog",
    description:
      "A modal dialog that interrupts the user with important content and expects a response.",
  },
  {
    title: "Hover Card",
    href: "/docs/primitives/hover-card",
    description:
      "For sighted users to preview content available behind a link.",
  },
  {
    title: "Progress",
    href: "/docs/primitives/progress",
    description:
      "Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.",
  },
  {
    title: "Scroll-area",
    href: "/docs/primitives/scroll-area",
    description: "Visually or semantically separates content.",
  },
  {
    title: "Tabs",
    href: "/docs/primitives/tabs",
    description:
      "A set of layered sections of content—known as tab panels—that are displayed one at a time.",
  },
  {
    title: "Tooltip",
    href: "/docs/primitives/tooltip",
    description:
      "A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.",
  },
];

export function NavigationMenuDemo() {
  console.log("NavigationMenuDemo rendered");
  const [search, setSearch] = React.useState<string>("");
  const [debouncedSearch, setDebouncedSearch] = React.useState("");

  const inputSuggestion = useAppSelector(
    (state) => state.inputSuggestions.suggestions,
  );

  const dispatch = useDispatch();

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  React.useEffect(() => {
    if (debouncedSearch.trim().length < 3) {
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const response = await getInputSuggesions({ q: debouncedSearch });
        console.log("suggestions", response.suggestions);
        dispatch(setInputSuggestions(response.suggestions));
      } catch (error) {
        console.error("somthing went wrong", error);
      }
    };

    fetchSuggestions();
  }, [debouncedSearch]);

  console.log("inputSuggestion", inputSuggestion);
  console.log("length", inputSuggestion.length);

  return (
    <div className="w-screen h-15 flex items-center px-6 border-b">
      <div className="w-1/2">
        <Field orientation="horizontal">
          <Input
            type="search"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button>Search</Button>
        </Field>

        {search.trim() && inputSuggestion.length > 0 && (
          <div className="absolute top-10 left-5 mt-1 z-50 w-[1150px] bg-white border rounded-md shadow-lg">
            {inputSuggestion.map((sugg) => (
              <div
                key={sugg}
                className="px-3 py-2 hover:bg-gray-100 text-black cursor-pointer"
              >
                {sugg}
              </div>
            ))}
          </div>
        )}
      </div>
      <NavigationMenu className="w-1/2 flex max-w-none">
        <NavigationMenuList className="w-50">
          <NavigationMenuItem>
            <NavigationMenuTrigger>Getting started</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="w-96">
                <ListItem href="/docs" title="Introduction">
                  Re-usable components built with Tailwind CSS.
                </ListItem>
                <ListItem href="/docs/installation" title="Installation">
                  How to install dependencies and structure your app.
                </ListItem>
                <ListItem href="/docs/primitives/typography" title="Typography">
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem className="hidden md:flex">
            <NavigationMenuTrigger>Components</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-2 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/docs">Docs</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
    </div>
  );
}

function ListItem({
  title,
  children,
  href,
  ...props
}: React.ComponentPropsWithoutRef<"li"> & { href: string }) {
  return (
    <li {...props}>
      <NavigationMenuLink asChild>
        <Link to={href}>
          <div className="flex flex-col gap-1 text-sm">
            <div className="leading-none font-medium">{title}</div>
            <div className="line-clamp-2 text-muted-foreground">{children}</div>
          </div>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
