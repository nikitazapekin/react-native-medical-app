export interface ListItem {
  id: string;
  label: string;
  type?: string;
}

export interface SortOptions {
  sortOptions: ListItem[];
}
