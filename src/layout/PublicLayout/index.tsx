import React,{useState,useEffect} from "react";
import { Box, Toolbar } from "@mui/material";
import { Outlet } from "react-router-dom";
import Header from "./Header";

const PublicLayout = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      // Check if 'window' exists and has 'scrollY'
      if (typeof window !== 'undefined' && 'scrollY' in window) {
        const scrollY = window.scrollY;
        setScrolled(scrollY > 20);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <Header scrolled={scrolled} />
      <Box component="main" sx={{ p: 0 }}>
        {/* <Toolbar /> */}
        <Outlet />
      </Box>
      {/*<Footer />*/}
    </>
  );
};

export default PublicLayout;