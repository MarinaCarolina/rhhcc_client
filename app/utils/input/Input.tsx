import get from 'lodash/get';

interface IUIInputProps {
  onClick?: () => void;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  type?: 'text' | 'password' | 'email' | 'number';
  className?: string;
  value?: string;
  name: string;
  label?: string;
  placeholder?: string;
  size?: 'default' | 'small';
  disabled?: boolean;
  error?: string;
  required?: boolean;
  id?: string;
  defaultValue?: string | number;
}

const Input = (props: IUIInputProps) => {
  const onClick = get(props, 'onClick', () => {});
  const onChange = get(props, 'onChange', () => {});
  const type = get(props, 'type', 'text');
  const label = get(props, 'label', '');
  const className = get(props, 'className', '');
  const name = get(props, 'name', '');
  const placeholder = get(props, 'placeholder', '');
  const size = get(props, 'size', '');
  const disabled = get(props, 'disabled', false);
  const required = get(props, 'required', false);
  const defaultValue = get(props, 'defaultValue', '');

  const baseClasses =
    'border border-gray-300 text-gray-900 text-sm rounded-sm outline-none focus:ring-primary-400 focus:border-primary-500 block w-full p-2.5';

  const sizeClasses = size === 'small' ? 'px-1 py-1 text-xs' : '';

  return (
    <div className={`${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`mb-2 block text-sm font-medium`}
        >
          {label}
        </label>
      )}

      <input
        id={name}
        disabled={disabled}
        type={type}
        name={name}
        placeholder={`${placeholder}${required ? ' *' : ' '}`}
        className={`${baseClasses} ${sizeClasses}`}
        onClick={onClick}
        onChange={onChange}
        defaultValue={defaultValue}
      />
    </div>
  );
};

export default Input;
