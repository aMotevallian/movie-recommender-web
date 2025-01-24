"use client";
import Link from "next/link";
import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import { useAuth } from "../components/authContext";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Menu,
  MenuItem,
  TextField,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Box,
} from "@mui/material";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Anchor for dropdown menu
  const { user, logout } = useAuth(); // Auth context
  const [search, setSearch] = useState<string>(""); // Search input state

  const searchParam = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const links = [
    { id: 1, name: "Browse All", link: "/home" },
    { id: 2, name: "About", link: "/about" },
    { id: 3, name: "Find Your Match", link: "/match" },
  ];

  // Handle logout
  const handleLogout = async () => {
    logout(); // Call your logout function
    window.location.reload(); // Reload or redirect to login page
  };

  // Search handler
  const handleSearch = (searchItem: string) => {
    setSearch(searchItem);
    const params = new URLSearchParams(searchParam);
    if (searchItem) params.set("query", searchItem);
    else params.delete("query");
    replace(`${pathname}?${params.toString()}`);
  };

  // Dropdown menu handlers
  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  // Mobile menu toggle
  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  return (
    <AppBar position="sticky" sx={{ backgroundColor: "black" }}>
      <Toolbar className="flex justify-between items-center">
        {/* Left Side: Logo and Navigation Links */}
        <Box className="flex items-center space-x-4">
          <h1 className="text-4xl font-bold">
            <Link href="/" className="text-white">
              MovieYab
            </Link>
          </h1>
          <Box className="hidden lg:flex space-x-4">
            {links.map(({ id, name, link }) => (
              <Button key={id} component={Link} href={link} sx={{ color: "white", textTransform: "none" }}>
                {name}
              </Button>
            ))}
          </Box>
        </Box>

        {/* Right Side: Search and Profile */}
        <Box className="hidden lg:flex space-x-4 items-center justify-end">
          {/* Search Bar */}
          <TextField
            // variant="outlined"
            size="small"
            placeholder="Search..."
            value={search}
            onChange={(e) => handleSearch(e.target.value)}
            sx={{
              input: { color: "white", backgroundColor: "black" },
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: "white",
                },
                "&:hover fieldset": {
                  borderColor: "#aaa",
                },
              },
            }}
          />

          {/* Profile Button */}
          {user ? (
            <>
              <Button
                onMouseEnter={handleMenuOpen}
                sx={{ color: "white", textTransform: "none" }}
              >
                Profile
              </Button>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onMouseLeave={handleMenuClose}
                MenuListProps={{
                  onMouseEnter: () => setAnchorEl(anchorEl),
                }}
              >
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/ratings">My Ratings</Link>
                </MenuItem>
                <MenuItem onClick={handleMenuClose}>
                  <Link href="/watchlist">My Watchlist</Link>
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleMenuClose();
                    handleLogout();
                  }}
                >
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button component={Link} href="/register" sx={{ color: "white", textTransform: "none" }}>
              Login
            </Button>
          )}
        </Box>

        {/* Mobile Menu Icon */}
        <IconButton
          edge="end"
          color="inherit"
          aria-label="menu"
          onClick={toggleMobileMenu}
          className="lg:hidden"
        >
          <FaBars />
        </IconButton>
      </Toolbar>

      {/* Mobile Menu */}
      <Drawer anchor="right" open={mobileMenuOpen} onClose={toggleMobileMenu}>
        <List sx={{ width: 250, backgroundColor: "black", height: "100%" }}>
          {links.map(({ id, name, link }) => (
            <ListItem key={id} button component={Link} href={link}>
              <ListItemText primary={name} sx={{ color: "white" }} />
            </ListItem>
          ))}
          {user && (
            <>
              <ListItem button component={Link} href="/ratings">
                <ListItemText primary="My Ratings" sx={{ color: "white" }} />
              </ListItem>
              <ListItem button component={Link} href="/watchlist">
                <ListItemText primary="My Watchlist" sx={{ color: "white" }} />
              </ListItem>
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" sx={{ color: "white" }} />
              </ListItem>
            </>
          )}
          {!user && (
            <ListItem button component={Link} href="/register">
              <ListItemText primary="Login" sx={{ color: "white" }} />
            </ListItem>
          )}
        </List>
      </Drawer>
    </AppBar>
  );
};

export default Navbar;
