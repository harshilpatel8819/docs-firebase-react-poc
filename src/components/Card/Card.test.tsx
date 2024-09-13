import { render, screen } from "@testing-library/react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "./Card";
import "@testing-library/jest-dom";

describe("Card Component", () => {
  // Test rendering with default props
  test("renders a Card with default props", () => {
    render(<Card>Card Content</Card>);
    const card = screen.getByText(/card content/i);
    expect(card).toBeInTheDocument();
  });

  // Test rendering with additional className
  test("renders a Card with additional className", () => {
    render(<Card className="custom-class">Card Content</Card>);
    const card = screen.getByText(/card content/i);
    expect(card).toHaveClass("custom-class");
  });
});

describe("CardHeader Component", () => {
  // Test rendering with default props
  test("renders a CardHeader with default props", () => {
    render(<CardHeader>Header Content</CardHeader>);
    const header = screen.getByText(/header content/i);
    expect(header).toBeInTheDocument();
  });

  // Test rendering with additional className
  test("renders a CardHeader with additional className", () => {
    render(<CardHeader className="header-class">Header Content</CardHeader>);
    const header = screen.getByText(/header content/i);
    expect(header).toHaveClass("header-class");
  });
});

describe("CardTitle Component", () => {
  // Test rendering with default props
  test("renders a CardTitle with default props", () => {
    render(<CardTitle>Title Content</CardTitle>);
    const title = screen.getByText(/title content/i);
    expect(title).toBeInTheDocument();
  });

  // Test rendering with additional className
  test("renders a CardTitle with additional className", () => {
    render(<CardTitle className="title-class">Title Content</CardTitle>);
    const title = screen.getByText(/title content/i);
    expect(title).toHaveClass("title-class");
  });
});

describe("CardDescription Component", () => {
  // Test rendering with default props
  test("renders a CardDescription with default props", () => {
    render(<CardDescription>Description Content</CardDescription>);
    const description = screen.getByText(/description content/i);
    expect(description).toBeInTheDocument();
  });

  // Test rendering with additional className
  test("renders a CardDescription with additional className", () => {
    render(
      <CardDescription className="description-class">
        Description Content
      </CardDescription>
    );
    const description = screen.getByText(/description content/i);
    expect(description).toHaveClass("description-class");
  });
});

describe("CardContent Component", () => {
  // Test rendering with default props
  test("renders a CardContent with default props", () => {
    render(<CardContent>Content Content</CardContent>);
    const content = screen.getByText(/content content/i);
    expect(content).toBeInTheDocument();
  });

  // Test rendering with additional className
  test("renders a CardContent with additional className", () => {
    render(
      <CardContent className="content-class">Content Content</CardContent>
    );
    const content = screen.getByText(/content content/i);
    expect(content).toHaveClass("content-class");
  });
});

describe("CardFooter Component", () => {
  // Test rendering with default props
  test("renders a CardFooter with default props", () => {
    render(<CardFooter>Footer Content</CardFooter>);
    const footer = screen.getByText(/footer content/i);
    expect(footer).toBeInTheDocument();
  });

  // Test rendering with additional className
  test("renders a CardFooter with additional className", () => {
    render(<CardFooter className="footer-class">Footer Content</CardFooter>);
    const footer = screen.getByText(/footer content/i);
    expect(footer).toHaveClass("footer-class");
  });
});
