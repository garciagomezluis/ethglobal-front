import { Image } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

export const Logo = () => (
    <Link to="/">
        <Image alt="hermes" h="50px" src="/logo.jpeg" title="hermes" w="50px" />
    </Link>
);

export default Logo;
