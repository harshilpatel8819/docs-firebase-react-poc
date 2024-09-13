import { render, screen, fireEvent } from "@testing-library/react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
} from "./Dialog";
import "@testing-library/jest-dom";

describe("Dialog Component", () => {
  test("renders Dialog trigger", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>This is the description</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    // Check if the trigger button is rendered
    const trigger = screen.getByText("Open Dialog");
    expect(trigger).toBeInTheDocument();
  });

  test("opens the Dialog when the trigger is clicked", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Description for the dialog</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    // Open the dialog by clicking the trigger
    fireEvent.click(screen.getByText("Open Dialog"));

    // Check if the dialog content is rendered
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
  });

  test("closes the Dialog when the close button is clicked", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Description for the dialog</DialogDescription>
          <DialogClose>Close</DialogClose>
        </DialogContent>
      </Dialog>
    );

    // Open the dialog by clicking the trigger
    fireEvent.click(screen.getByText("Open Dialog"));

    // Check if the dialog content is rendered
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();

    // Close the dialog by clicking the close button
    fireEvent.click(screen.getByText("Close"));

    // Ensure the dialog is closed
    expect(screen.queryByText("Dialog Title")).not.toBeInTheDocument();
  });

  test("renders custom content inside Dialog", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Description for the dialog</DialogDescription>
          <p>Custom Content</p>
        </DialogContent>
      </Dialog>
    );

    // Open the dialog
    fireEvent.click(screen.getByText("Open Dialog"));

    // Check if custom content is rendered
    expect(screen.getByText("Custom Content")).toBeInTheDocument();
  });

  test("DialogOverlay and DialogContent render correctly", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogTitle>Dialog Title</DialogTitle>
          <DialogDescription>Description for the dialog</DialogDescription>
        </DialogContent>
      </Dialog>
    );

    // Open the dialog
    fireEvent.click(screen.getByText("Open Dialog"));

    // Verify overlay and content are in the document
    const overlay = screen.getByRole("dialog");
    expect(overlay).toBeInTheDocument();
    expect(screen.getByText("Dialog Title")).toBeInTheDocument();
  });

  // Test for DialogFooter
  test("renders DialogFooter with custom content", () => {
    render(
      <Dialog>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Header rendered</DialogTitle>
          </DialogHeader>
          <DialogDescription>Description Here</DialogDescription>
          <DialogFooter className="custom-footer">
            <button>Footer Button</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );

    // Open the dialog
    fireEvent.click(screen.getByText("Open Dialog"));

    expect(screen.getByText("Header rendered")).toBeInTheDocument();

    expect(screen.getByText("Footer Button")).toBeInTheDocument();
  });
});
