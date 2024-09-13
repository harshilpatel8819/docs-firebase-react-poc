import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./Button";
import { cn } from "../../utils/utils";
import { buttonVariants } from "./buttonVariants";
import React from "react";
import "@testing-library/jest-dom";

const validVariant = "ghost";
const validSize = "sm";

describe("Button Component", () => {
  // Test rendering with default props
  test("renders a button with default props", () => {
    render(<Button>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
  });

  // Test rendering with `asChild` prop
  test("renders a Slot component when asChild is true", () => {
    render(
      <Button asChild>
        <span>Click me</span>
      </Button>
    );
    const span = screen.getByText(/click me/i);
    expect(span).toBeInTheDocument();
  });

  // Test className and variant props
  test("applies correct classes based on variant and size", () => {
    render(
      <Button variant={validVariant} size={validSize}>
        Click me
      </Button>
    );

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(
      cn(buttonVariants({ variant: validVariant, size: validSize }))
    );
  });

  // Test that the ref is forwarded correctly
  test("forwards ref to the underlying button element", () => {
    const ref = React.createRef<HTMLButtonElement>();
    render(<Button ref={ref}>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    expect(ref.current).toBe(button);
  });

  // Test button click event
  test("handles click events", () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click me</Button>);
    const button = screen.getByRole("button", { name: /click me/i });
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalled();
  });
});
