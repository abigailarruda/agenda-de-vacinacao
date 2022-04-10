import Link, { LinkProps } from 'next/link';
import { Link as ChakraLink } from '@chakra-ui/react';
import { useRouter } from 'next/router';

interface Props extends LinkProps {
  activeUrl?: string;
  children: React.ReactNode;
}

const NavLink = ({ href, activeUrl, children, ...rest }: Props) => {
  const { pathname } = useRouter();

  const isActive = pathname.includes(activeUrl, 0);

  const customActiveStyles = isActive
    ? { color: 'green.600', fontWeight: 'medium' }
    : { color: 'gray.800', fontWeight: 'normal' };

  return (
    <Link href={href} {...rest} passHref>
      <ChakraLink {...customActiveStyles}>
        {children}
      </ChakraLink>
    </Link>
  );
};

export default NavLink;
