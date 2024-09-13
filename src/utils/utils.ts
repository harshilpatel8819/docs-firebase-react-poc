import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

import {
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const generateRandomUsername = () => {
  const randomName = uniqueNamesGenerator({
    dictionaries: [adjectives, colors, animals],
    separator: "-",
    length: 1, // You can adjust the length as per your need
  });

  return `Anonymous-${randomName}`;
};
