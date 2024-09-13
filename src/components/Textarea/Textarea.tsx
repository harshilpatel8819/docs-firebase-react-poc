import * as React from "react";
import { cn } from "../../utils/utils";

export type TextAreaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement>;

const TextArea = React.forwardRef<HTMLTextAreaElement, TextAreaProps>(
  ({ className, rows = 5, ...props }, ref) => {
    return (
      <textarea
        className={cn(
          "flex w-full rounded-md border border-TextArea bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-0 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        rows={rows}
        ref={ref}
        {...props}
      />
    );
  }
);

TextArea.displayName = "TextArea";

export const MemoizedTextArea = React.memo(TextArea);
