import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";

describe("Popover", () => {
  test("renders PopoverContent and triggers visibility on open", () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover Content</p>
        </PopoverContent>
      </Popover>
    );

    // Assert the content is not visible initially
    expect(screen.queryByText(/popover content/i)).not.toBeInTheDocument();

    // Act - Open the popover
    fireEvent.click(screen.getByText(/open popover/i));

    // Assert the content is visible after clicking the trigger
    expect(screen.getByText(/popover content/i)).toBeInTheDocument();
  });

  test("handles PopoverTrigger click events", () => {
    const handleClick = jest.fn();
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button onClick={handleClick}>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover Content</p>
        </PopoverContent>
      </Popover>
    );

    // Act - Click the PopoverTrigger
    fireEvent.click(screen.getByText(/open popover/i));

    // Assert the handleClick function was called
    expect(handleClick).toHaveBeenCalled();
  });

  test("closes PopoverContent when Escape key is pressed", () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>
          <p>Popover Content</p>
        </PopoverContent>
      </Popover>
    );

    // Act - Open the popover
    fireEvent.click(screen.getByText(/open popover/i));

    // Assert the content is visible after opening
    expect(screen.getByText(/popover content/i)).toBeInTheDocument();

    // Act - Press Escape key
    fireEvent.keyDown(document, { key: "Escape", code: "Escape" });

    // Assert the content is no longer visible
    expect(screen.queryByText(/popover content/i)).not.toBeInTheDocument();
  });

  test("should not render PopoverContent if no children are provided", () => {
    render(
      <Popover>
        <PopoverTrigger asChild>
          <button>Open Popover</button>
        </PopoverTrigger>
        <PopoverContent>{/* No content */}</PopoverContent>
      </Popover>
    );

    // Act - Open the popover
    fireEvent.click(screen.getByText(/open popover/i));

    // Assert no content is rendered
    expect(screen.queryByText(/popover content/i)).not.toBeInTheDocument();
  });
});
