import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import {
  Drawer,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "./Drawer"; // Adjust the import path as necessary

describe("Drawer Component", () => {
  // Test rendering DrawerHeader with additional className
  test("renders a DrawerHeader with additional className", () => {
    render(
      <Drawer>
        <DrawerHeader className="header-class">Header</DrawerHeader>
      </Drawer>
    );
    expect(screen.getByText(/header/i)).toHaveClass("header-class");
  });

  // Test rendering DrawerFooter with additional className
  test("renders a DrawerFooter with additional className", () => {
    render(
      <Drawer>
        <DrawerFooter className="footer-class">Footer</DrawerFooter>
      </Drawer>
    );
    expect(screen.getByText(/footer/i)).toHaveClass("footer-class");
  });

  // Test rendering DrawerTitle with default props
  test("renders a DrawerTitle with default props", () => {
    render(
      <Drawer>
        <DrawerTitle>Title</DrawerTitle>
      </Drawer>
    );
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });

  // Test rendering DrawerDescription with default props
  test("renders a DrawerDescription with default props", () => {
    render(
      <Drawer>
        <DrawerDescription>Description</DrawerDescription>
      </Drawer>
    );
    expect(screen.getByText(/description/i)).toBeInTheDocument();
  });
});
