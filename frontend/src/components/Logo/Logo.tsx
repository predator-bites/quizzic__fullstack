import cn from 'classnames';
import React from 'react';

interface Props {
  className?: string;
  onClick?: () => void;
  size: 'small' | 'medium' | 'big';
}
export const Logo: React.FC<Props> = ({ className = '', onClick, size }) => {
  return (
    <div className={cn('logo', className)} onClick={onClick}>
      <img
        className={cn('logo__image', `logo__image--${size}`)}
        src="./logo.svg"
        alt="Logo"
      />
    </div>
  );
};
