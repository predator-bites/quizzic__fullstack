import React from 'react';
import { NavLink } from 'react-router-dom';
import { Logo } from '../Logo';

export const Header: React.FC = () => {
  return (
    <header className="header">
      <NavLink to="/" className="header__logoLink" aria-label="Home">
        <Logo className="header__logo" size="medium" />
      </NavLink>

      <nav className="header__nav" aria-label="Main navigation">
        <NavLink
          to="/quizzes"
          className={({ isActive }) =>
            `header__navLink ${isActive ? 'header__navLink--active' : ''}`
          }
        >
          All Quizzes
        </NavLink>

        <NavLink
          to="/create"
          className={({ isActive }) =>
            `header__navLink header__navLink--cta ${isActive ? 'header__navLink--active' : ''}`
          }
        >
          + Create
        </NavLink>
      </nav>
    </header>
  );
};
