"use client";
import { Disclosure, DisclosureButton, DisclosurePanel } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import GitHub from "./github";

export default function Component() {
  const navigation: { name: string; href: string; level: number; current?: boolean }[] = [
    { name: "Overview", href: "#section-overview", level: 0 },
    { name: "Why", href: "#section-overview-why", level: 1 },
    { name: "Installation", href: "#section-overview-installation", level: 1 },
    { name: "Application", href: "#section-overview-application", level: 1 },
    { name: "Conventions", href: "#section-overview-conventions", level: 1 },
    { name: "Extension", href: "#section-overview-extension", level: 1 },
    { name: "Operations", href: "#section-operations", level: 0 },
    { name: "Aspect", href: "#section-operations-aspect", level: 1 },
    { name: "Crop", href: "#section-operations-crop", level: 1 },
    { name: "Height", href: "#section-operations-height", level: 1 },
    { name: "Width", href: "#section-operations-width", level: 1 },
    { name: "Image Credits", href: "#section-image-credits", level: 0 },
  ];

  return (
    <Disclosure as="nav">
      {({ open }) => (
        <>
          <div className="mx-auto">
            <div className="relative flex h-12">
              <div className="relative flex ">
                <div className="flex flex-shrink-0 items-center">
                  <h1 className="m-0">🚜 Tractor Loader</h1>
                </div>
              </div>
              <div className="absolute inset-y-0 right-0 flex items-center">
                <GitHub href="https://github.com/jasonthorsness/tractor-loader" />
                <DisclosureButton className="relative inline-flex items-center justify-center rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 hover:bg-gray-200 dark:hover:bg-gray-900">
                  <span className="absolute -inset-0.5" />
                  <span className="sr-only">Open main menu</span>
                  {open ? (
                    <XMarkIcon className="block h-8 w-8" aria-hidden="true" />
                  ) : (
                    <Bars3Icon className="block h-8 w-8" aria-hidden="true" />
                  )}
                </DisclosureButton>
              </div>
            </div>
          </div>
          <DisclosurePanel>
            <div className="space-y-1 pb-1 pt-1">
              {navigation.map((item) => (
                <DisclosureButton
                  key={item.name}
                  as="a"
                  href={item.href}
                  className={`block rounded-md px-2 py-2 text-base font-medium focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-600 hover:bg-gray-200 dark:hover:bg-gray-900`}
                  aria-current={item.current ? "page" : undefined}
                >
                  <span
                    className="whitespace-nowrap"
                    style={{ paddingLeft: item.level * 16 + "px" }}
                  >
                    {item.name}
                  </span>
                </DisclosureButton>
              ))}
            </div>
          </DisclosurePanel>
        </>
      )}
    </Disclosure>
  );
}
