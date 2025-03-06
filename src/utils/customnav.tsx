import { Box } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { CustomNavLinkProps } from "./types";

const CustomNavLink: React.FC<CustomNavLinkProps> = ({ to, children }) => {
  return (
    <Box
      as={NavLink}
      to={to}
      px={3}
      py={2}
      rounded="md"
      fontWeight="medium"
      color="gray.600"
      _hover={{ bg: "#D9EAFD", color: "#9694FF" }}
      _activeLink={{ bg: "blue.200", color: "blue.800", fontWeight: "bold" }}
      style={({ isActive }: { isActive: boolean }) => (isActive ? { backgroundColor: "#BEE3F8", color: "#2C5282" } : {})}
    >
      {children}
    </Box>
  );
};

export default CustomNavLink;
