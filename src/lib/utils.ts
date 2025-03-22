import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function createImage(size: string, path: string): string {
  return `https://image.tmdb.org/t/p/${size}/${path}`;
}
