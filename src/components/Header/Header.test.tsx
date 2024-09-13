import { render, screen, fireEvent } from "@testing-library/react";
import { MemoryRouter, Route, Routes, useNavigate } from "react-router-dom";
import Header from "./Header";
import useHeader from "./useHeader";
import "@testing-library/jest-dom";

// Mocking the `useHeader` hook
jest.mock("./useHeader", () => ({
  __esModule: true,
  default: jest.fn(() => ({
    handleValueChange: jest.fn(),
    value: "Document Title",
    handleCopyLink: jest.fn(),
    copyText: "Copy Link",
  })),
}));

describe("Header Component", () => {
  const mockUseHeader = useHeader as jest.Mock;

  test("triggers `handleChange` when input value changes", () => {
    const mockHandleChange = jest.fn();
    mockUseHeader.mockReturnValue({
      handleChange: mockHandleChange,
      value: "Document Title",
      handleCopyLink: jest.fn(),
      copyText: "Copy Link",
    });

    render(
      <MemoryRouter initialEntries={["/docs/1"]}>
        <Routes>
          <Route
            path="/docs/:id"
            element={
              <Header isUpdating={true} title="Editing" saveLoading={true} />
            }
          />
        </Routes>
      </MemoryRouter>
    );

    // Change event simulation
    const inputElement = screen.getByDisplayValue("Document Title");
    fireEvent.change(inputElement, { target: { value: "New Title" } });

    // Check if handleChange was called with the new value
    expect(mockHandleChange).toHaveBeenCalledWith("New Title");
  });

  test("renders header with default props", () => {
    render(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    );

    // Check for the logo
    const logoElement = screen.getByTestId("header-logo");
    expect(logoElement).toBeInTheDocument();

    // Check for default title "Docs"
    const titleElement = screen.getByText("Docs");
    expect(titleElement).toBeInTheDocument();
  });

  test("renders header with document title and input when `params.id` exists", () => {
    render(
      <MemoryRouter initialEntries={["/docs/1"]}>
        <Routes>
          <Route
            path="/docs/:id"
            element={
              <Header isUpdating={true} title="Editing" saveLoading={true} />
            }
          ></Route>
        </Routes>
      </MemoryRouter>
    );
    // Check for input with document title value
    const inputElement = screen.getByDisplayValue("Document Title");
    expect(inputElement).toBeInTheDocument();

    // Check for saving state
    const savingText = screen.getByText("Saving..");
    expect(savingText).toBeInTheDocument();
  });

  test("renders saved state when `saveLoading` is false", () => {
    render(
      <MemoryRouter initialEntries={["/edit/1"]}>
        <Routes>
          <Route
            path="/edit/:id"
            element={<Header saveLoading={false} />}
          ></Route>
        </Routes>
      </MemoryRouter>
    );
    const savedIcon = screen.getByTestId("saved-doc-logo");
    const savedText = screen.getByText("Saved");

    expect(savedIcon).toBeInTheDocument();
    expect(savedText).toBeInTheDocument();
  });

  test("triggers `handleCopyLink` when copy button is clicked", () => {
    const mockHandleCopyLink = jest.fn();
    mockUseHeader.mockReturnValue({
      handleValueChange: jest.fn(),
      value: "Document Title",
      handleCopyLink: mockHandleCopyLink,
      copyText: "Copy Link",
    });

    render(
      <MemoryRouter initialEntries={["/docs/1"]}>
        <Routes>
          <Route
            path="/docs/:id"
            element={
              <Header isUpdating={true} title="Editing" saveLoading={true} />
            }
          ></Route>
        </Routes>
      </MemoryRouter>
    );

    // Click the copy button
    const copyButton = screen.getByText("Copy Link");
    fireEvent.click(copyButton);

    // Check if the copy handler was called
    expect(mockHandleCopyLink).toHaveBeenCalled();
  });
});

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: jest.fn(),
}));

describe("Header Component Back Button", () => {
  const mockNavigate = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks(); // Clear any previous mocks
    (useNavigate as jest.Mock).mockReturnValue(mockNavigate);
  });

  test("renders back button when `params.id` exists and navigates back on click", () => {
    render(
      <MemoryRouter initialEntries={["/docs/2"]}>
        <Routes>
          <Route path="/docs/:id" element={<Header />}></Route>
        </Routes>
      </MemoryRouter>
    );

    // Check that the back button is present
    const backButton = screen.getByRole("button", { name: /back-button/i });
    expect(backButton).toBeInTheDocument();

    fireEvent.click(backButton);

    // Ensure navigate is called with -1 (go back)
    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
