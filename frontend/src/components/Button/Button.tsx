/* eslint-disable @typescript-eslint/no-explicit-any */
import cn from 'classnames';
import React from 'react';

interface Props {
  children?: React.ReactNode;
  size?: Size;
  className?: string;
  onClick?: (...args: any[]) => void;
  style?: '' | 'invert';
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export const Button: React.FC<Props> = ({
  children,
  size,
  className = '',
  onClick,
  style = '',
  disabled = false,
  type = 'submit',
}) => {
  return (
    <button
      type={type}
      className={cn('button', className, {
        'button--invert': style,
        [`button--${size}`]: size,
      })}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
