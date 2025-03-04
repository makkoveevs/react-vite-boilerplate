import { Breadcrumb } from "antd";
import { ItemType } from "antd/es/breadcrumb/Breadcrumb";
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { ROUTES, ROUTE_NAMES } from "src/shared/ROUTES";

export interface BreadcrumbsProps {}

export const Breadcrumbs = (): React.JSX.Element => {
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const breadcrumbItems: ItemType[] = [
    { path: ROUTES.root, title: ROUTE_NAMES.root }
  ];

  pathSegments.forEach((_, index) => {
    const fullPath = `/${pathSegments.slice(0, index + 1).join("/")}`;
    const title = Object.entries(ROUTES).find(
      ([_, path]) => path === fullPath
    )?.[0];
    if (title) {
      breadcrumbItems.push({
        path: fullPath,
        title: ROUTE_NAMES[title as keyof typeof ROUTE_NAMES]
      });
    }
  });
  return <Breadcrumb itemRender={itemRender} items={breadcrumbItems} />;
};

function itemRender(
  currentRoute: ItemType,
  _params: any,
  items: ItemType[],
  _paths: string[]
) {
  const isLast = currentRoute?.path === items[items.length - 1]?.path;

  return isLast ? (
    <span>{currentRoute.title}</span>
  ) : (
    <Link to={currentRoute.path!}>{currentRoute.title}</Link>
  );
}
