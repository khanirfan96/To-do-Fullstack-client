import {
    Avatar,
    Box,
    Button,
    Drawer,
    DrawerBody,
    DrawerCloseButton,
    DrawerContent,
    DrawerOverlay,
    Flex,
    HStack,
    IconButton,
    Input,
    InputGroup,
    InputLeftElement,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    VStack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    Image,
    Link
} from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu, FiMoon, FiSearch, FiSun, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import hc from '../assets/images/hc.jpg'
import CustomNavLink from "../utils/customnav";

const Navbar = () => {

    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const [search, setSearch] = useState("");

    return (
        <Box bg={useColorModeValue("gray.100", "gray.900")} px={4} boxShadow="md">
            <Flex h={16} alignItems="center" justifyContent="space-between">
                {/* Left: Mobile Menu Button */}
                <IconButton
                    size="md"
                    icon={isOpen ? <FiX /> : <FiMenu />}
                    aria-label="Open Menu"
                    display={{ base: "flex", md: "none" }}
                    onClick={isOpen ? onClose : onOpen}
                />

                {/* Center: Logo & Links */}
                <HStack spacing={8} alignItems="center">
                    <Link as={NavLink} to="/">
                        <Image src="/images/HC-logo.jpg" alt="Logo" h={14} w={20} />
                    </Link>
                    <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
                        <CustomNavLink to="/">Home</CustomNavLink>
                        <CustomNavLink to="/calorie">Track Calories</CustomNavLink>
                        {/* <NavLink to="/services">Services</NavLink>
            <NavLink to="/contact">Contact</NavLink> */}
                    </HStack>
                </HStack>

                {/* Right: Search, Dark Mode, Profile */}
                <Flex alignItems="center">
                    <InputGroup w={{ base: "150px", md: "250px" }} mr={4}>
                        <InputLeftElement pointerEvents="none">
                            <FiSearch color="gray.500" />
                        </InputLeftElement>
                        <Input
                            placeholder="Search..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </InputGroup>

                    <IconButton
                        size="md"
                        icon={colorMode === "light" ? <FiMoon /> : <FiSun />}
                        onClick={toggleColorMode}
                        aria-label="Toggle Dark Mode"
                        mr={4}
                    />

                    <Menu>
                        <MenuButton as={Button} rounded="full" variant="link" cursor="pointer">
                            <Avatar size="sm" name="User" />
                        </MenuButton>
                        <MenuList>
                            <MenuItem>Profile</MenuItem>
                            <MenuItem>Settings</MenuItem>
                            <MenuItem>Logout</MenuItem>
                        </MenuList>
                    </Menu>
                </Flex>
            </Flex>

            {/* Mobile Drawer */}
            <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        <VStack spacing={4} mt={8}>
                            <NavLink to="/" onClick={onClose}>
                                Home
                            </NavLink>
                            <NavLink to="/calorie" onClick={onClose}>
                                Track Calories
                            </NavLink>
                            {/* <NavLink to="/services" onClick={onClose}>
                Services
              </NavLink>
              <NavLink to="/contact" onClick={onClose}>
                Contact
              </NavLink> */}
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default Navbar