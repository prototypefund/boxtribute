import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { Box, Button, ListItem, UnorderedList, Text } from "@chakra-ui/react";

const OpenIcon = () => <Box>Open</Box>;
const CloseIcon = () => <Box>Close</Box>;

const MenuToggle = ({ toggle, isOpen }) => (
  <Box display={{ base: "block", md: "none" }} onClick={toggle}>
    {isOpen ? <CloseIcon /> : <OpenIcon />}
  </Box>
);

const Logo = () => (
  <Box>
    <Text fontSize="lg" fontWeight="bold">
      Logo
    </Text>
  </Box>
);
const MenuItem = ({ to, text }: { to: string; text: string }) => (
  <ListItem
    style={{
      display: "inline",
    }}
  >
    <Link to={to}>
      <Button>{text}</Button>
    </Link>
  </ListItem>
);

const HeaderMenu = () => {
  const { isAuthenticated, logout, loginWithRedirect } = useAuth0();
  return (
    <UnorderedList
      style={{
        listStyleType: "none",
      }}
    >
      <ListItem
        style={{
          display: "inline",
        }}
      >
        {isAuthenticated && logout != null && <Button onClick={() => logout()}>Logout</Button>}
        {!isAuthenticated && <Button onClick={() => loginWithRedirect()}>Login</Button>}
      </ListItem>
      <MenuItem to="/" text="Home" />
      <MenuItem to="/locations" text="Locations" />
      <MenuItem to="/boxes" text="Boxes" />
    </UnorderedList>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const toggle = () => setIsMenuOpen(!isMenuOpen);

  return (
    <Box>
      <MenuToggle toggle={toggle} isOpen={isMenuOpen} />
      <HeaderMenu />
    </Box>
  );
};

export default Header;
