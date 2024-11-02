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
  success?: boolean;
  required?: boolean;
  id?: string;
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
  const error = get(props, 'error', '');
  const success = get(props, 'success', '');
  const required = get(props, 'required', false);

  const baseClasses =
    'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-sm outline-none focus:ring-primary-400 focus:border-primary-500 block w-full p-2.5';

  const sizeClasses = size === 'small' ? 'px-1 py-1 text-xs' : '';

  const stateClasses = error
    ? 'bg-red-50 border-red-500 text-red-900 placeholder-red-700 focus:ring-red-500 focus:border-red-500'
    : success
      ? 'bg-green-50 border-green-500 text-green-900 placeholder-green-700 focus:ring-green-500 focus:border-green-500'
      : 'bg-white border-gray-300 text-gray-900';

  return (
    <div className={`${className}`}>
      {label && (
        <label
          htmlFor={name}
          className={`mb-2 block text-sm font-medium ${error ? 'text-red-700' : success ? 'text-green-700' : ''}`}
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
        className={`${baseClasses} ${sizeClasses} ${stateClasses}`}
        onClick={onClick}
        onChange={onChange}
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      {/*{success && <p className="text-xs text-green-600">{success}</p>}*/}
    </div>
  );
};

export default Input;
