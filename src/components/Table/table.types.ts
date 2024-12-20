import { JSX } from 'react';

export interface Column <T> {
    key: keyof T;
    label: string;
    render? : (value: T[keyof T], row: T) => JSX.Element
}

export interface TableProps<T> {
    data: T[];
    columns: Column<T>[];
    actions?: (row: T) => JSX.Element[];
  }