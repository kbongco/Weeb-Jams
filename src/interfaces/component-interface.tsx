export interface InputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

export interface SelectProps {
  selectedOption: string;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  options: string[];
}