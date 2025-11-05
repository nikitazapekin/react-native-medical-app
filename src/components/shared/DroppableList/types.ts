/* export interface ListItem {
  id: string;
  label: string;
  type?: string;
}

export interface SortOptions {
  sortOptions: ListItem[];
}
  */
 interface ListItem {
  id: string;
  label: string;
  type?: string;
}
export interface SortOptions {
  sortOptions: ListItem[];
}
export interface DroppableListProps extends SortOptions {
  handler?: (item: ListItem) => void;
  placeholder?: string;
}
