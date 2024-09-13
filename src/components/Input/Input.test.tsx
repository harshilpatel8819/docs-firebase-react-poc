import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import { Input } from "./Input";
import "@testing-library/jest-dom";

// Test that the ref is forwarded correctly
test("forwards ref to the underlying input element", () => {
  const ref = React.createRef<HTMLInputElement>();
  render(<Input ref={ref} type="text" />);
  const input = screen.getByRole("textbox");
  expect(ref.current).toBe(input);
});

// Test input change event
test("handles change events", () => {
  const handleChange = jest.fn();
  render(<Input type="text" onChange={handleChange} />);
  const input = screen.getByRole("textbox") as HTMLInputElement;
  fireEvent.change(input, { target: { value: "test value" } });
  expect(handleChange).toHaveBeenCalled();
  expect(input.value).toBe("test value");
});

// Test that className is applied correctly
test("applies custom className", () => {
  const customClass = "custom-input-class";
  render(<Input type="text" className={customClass} />);
  const input = screen.getByRole("textbox");
  expect(input).toHaveClass(customClass);
});

// Test that the input is disabled
test("renders a disabled input", () => {
  render(<Input type="text" disabled />);
  const input = screen.getByRole("textbox");
  expect(input).toBeDisabled();
});

// Test that the input accepts a placeholder
test("renders input with placeholder text", () => {
  const placeholderText = "Enter your name";
  render(<Input type="text" placeholder={placeholderText} />);
  const input = screen.getByPlaceholderText(placeholderText);
  expect(input).toBeInTheDocument();
});
