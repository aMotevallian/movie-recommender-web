"use client";

import React, { useState } from "react";
import Link from "next/link";
import { FaBars } from "react-icons/fa";
import Searchbar from "../components/Searchbar"; // مسیر فایل Searchbar را درست وارد کنید
import { useAuth } from "../components/authContext";
import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Menu,
  MenuItem,
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton
} from "@mui/material";

const Navbar = () => {
  const { user, logout } = useAuth(); // Auth context
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null); // Anchor for dropdown menu

  const links = [
    { id: 1, name: "Browse All", link: "/home" },
    { id: 2, name: "About", link: "/about" },
    { id: 3, name: "Find Your Match", link: "/match" },
  ];

  const handleLogout = async () => {
    logout();
    window.location.reload();
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
      <Toolbar className="flex justify-between items-center w-full">
        {/* Logo */}
        <Box className="flex items-center">
          <h1 className="text-3xl font-bold">
            <Link href="/" className="text-white">
              MovieYab
            </Link>
          </h1>
        </Box>

        {/* Desktop Navigation */}
        <Box
          className="hidden lg:flex space-x-6"
          style={{ width: "inherit", margin: "5px" }}
        >
          {links.map(({ id, name, link }) => (
            <Button
              key={id}
              component={Link}
              href={link}
              sx={{ color: "white", textTransform: "none" }}
            >
              {name}
            </Button>
          ))}
        </Box>

        {/* Searchbar */}
        <Box
          className="hidden lg:flex space-x-4 items-center justify-end"
          style={{ width: "inherit" }}
        >
          <Searchbar /> {/* اضافه کردن کامپوننت Searchbar */}
        </Box>

        {/* Profile Button */}
        <Box className="hidden lg:flex">
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
            <Button
              component={Link}
              href="/register"
              sx={{ color: "white", textTransform: "none" }}
            >
              Login
            </Button>
          )}
        </Box>
        <Box className="lg:hidden">
          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleMobileMenu}
          >
            <FaBars />
          </IconButton>
        </Box>
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
