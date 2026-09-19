import { Link } from 'react-router-dom';

const NavbarLink = ({ to, isActive, children }) => {
  return (
    <Link
      to={to}
      className={`py-1 px-3 text-text-primary text-body-md border-b-3 ${
        isActive
          ? 'border-accent-primary'
          : 'border-transparent hover:text-accent-primary-hover'
      }`}
    >
      {children}
    </Link>
  );
};

export default NavbarLink;
