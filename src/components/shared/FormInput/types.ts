export interface FormInputProps {
  placeholder: string;

  handler: (value: string) => void;
  label: string;
  type?: string;
    value: string;
}
