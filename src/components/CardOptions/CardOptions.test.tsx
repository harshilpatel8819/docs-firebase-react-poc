import { render, screen, fireEvent } from "@testing-library/react";
import { CardOptions } from "./CardOptions";
import "@testing-library/jest-dom";

describe("CardOptions Component", () => {
  const mockOnClick = jest.fn();
  const mockOnClose = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test rendering with options and handling clicks
  test("renders CardOptions with provided options and handles click events", () => {
    const options = [
      {
        icon: "🔧",
        label: "Settings",
        onClick: mockOnClick,
      },
      {
        icon: "❓",
        label: "Help",
      },
      {
        icon: "⚙️",
        label: "Custom Component",
        customComponent: <span data-testid="custom-component">Custom</span>,
      },
    ];

    render(<CardOptions options={options} onClose={mockOnClose} />);

    // Check if all options are rendered
    expect(screen.getByText(/settings/i)).toBeInTheDocument();
    expect(screen.getByText(/help/i)).toBeInTheDocument();
    expect(screen.getByTestId("custom-component")).toBeInTheDocument();

    // Click on the "Settings" option
    fireEvent.click(screen.getByText(/settings/i));
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalled();

    // Click on the "Help" option
    fireEvent.click(screen.getByText(/help/i));
    expect(mockOnClick).toHaveBeenCalled();
    expect(mockOnClose).toHaveBeenCalledTimes(2); // Ensure onClose was called twice

    // Verify that the custom component is rendered correctly
    expect(screen.getByTestId("custom-component")).toBeInTheDocument();
  });

  // Test rendering without custom components
  test("renders CardOptions without custom components", () => {
    const options = [
      {
        icon: "🔍",
        label: "Search",
      },
      {
        icon: "🔒",
        label: "Lock",
      },
    ];

    render(<CardOptions options={options} onClose={mockOnClose} />);

    // Check if all options are rendered
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/lock/i)).toBeInTheDocument();

    // Verify that no custom components are rendered
    expect(screen.queryByTestId("custom-component")).not.toBeInTheDocument();
  });

  // Test rendering with empty options
  test("renders CardOptions with no options", () => {
    render(<CardOptions options={[]} onClose={mockOnClose} />);

    // Check that no options are rendered
    expect(screen.queryByText(/settings/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/help/i)).not.toBeInTheDocument();
    expect(screen.queryByTestId("custom-component")).not.toBeInTheDocument();
  });

  // Test if the onClose function is called when an option is clicked
  test("calls onClose when an option is clicked", () => {
    const options = [
      {
        icon: "🔄",
        label: "Refresh",
      },
    ];

    render(<CardOptions options={options} onClose={mockOnClose} />);

    fireEvent.click(screen.getByText(/refresh/i));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test("renders customComponent and stops click event propagation", () => {
    const options = [
      { icon: "🔥", label: "Option 1" },
      { icon: "⭐", label: "Option 2" },
      {
        icon: "⚡",
        label: "Option 3",
        customComponent: <button>Custom Button</button>,
      },
    ];

    render(<CardOptions options={options} onClose={mockOnClose} />);

    const customButton = screen.getByText("Custom Button");
    const option3 = screen.getByText("Option 3").closest("div");

    fireEvent.click(customButton);

    expect(mockOnClose).not.toHaveBeenCalled();

    // Check that clicking outside the customComponent calls onClose
    fireEvent.click(option3!);
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
