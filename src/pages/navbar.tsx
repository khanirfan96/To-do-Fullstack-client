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
    Image,
    Input,
    InputGroup,
    InputLeftElement,
    Link,
    Menu,
    MenuButton,
    MenuItem,
    MenuList,
    VStack,
    useColorMode,
    useColorModeValue,
    useDisclosure,
    useToast
} from "@chakra-ui/react";
import { useState } from "react";
import { FiMenu, FiMoon, FiSearch, FiSun, FiX } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import useAuthStore from "../store/todo";
import CustomNavLink from "../utils/customnav";

const Navbar = () => {
    const logout = useAuthStore(state => state.logout);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { colorMode, toggleColorMode } = useColorMode();
    const [search, setSearch] = useState("");
    const toast = useToast();

    const handleLogout = async () => {
        if (logout) {
            toast({ title: "Thanks for using Health Cart", description: "You have successfully logout from the app", status: "success", duration: 3000, isClosable: true });
            await logout()
        } else {
            toast({ title: "Unable to logout", description: "Please check your network", status: "error", duration: 3000, isClosable: true });
        }
    }

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
                    <Link as={NavLink} to="/dashboard">
                        <Image src="/images/HC-logo.jpg" alt="Logo" h={14} w={20} />
                    </Link>
                    <HStack as="nav" spacing={4} display={{ base: "none", md: "flex" }}>
                        <CustomNavLink to="/todo">Home</CustomNavLink>
                        <CustomNavLink to="/calorie">Track Calories</CustomNavLink>
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
                            <MenuItem onClick={handleLogout}>Logout</MenuItem>
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
                            <NavLink to="/todo" onClick={onClose}>
                                Home
                            </NavLink>
                            <NavLink to="/calorie" onClick={onClose}>
                                Track Calories
                            </NavLink>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

export default Navbar