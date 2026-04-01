import { AppBar, Toolbar, Typography, Box, IconButton, Menu, MenuItem } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

function NavBar() {
  const location = useLocation();
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Sobre', path: '/sobre' },
    { label: 'Cadastro', path: '/cadastro' },
    { label: 'Lista', path: '/lista' },
  ];

  const breadcrumbNameMap = {
    '/': 'Home',
    '/sobre': 'Sobre',
    '/cadastro': 'Cadastro',
    '/lista': 'Lista',
  };

  const pathSegments = location.pathname === '/' ? ['Home'] : location.pathname.split('/').filter(Boolean).map((seg) => {
    const route = `/${seg}`;
    return breadcrumbNameMap[route] ?? seg;
  });

  const breadcrumb = pathSegments.join(' / ');

  const breadcrumbItems = pathSegments.map((seg, index) => {
    const isLast = index === pathSegments.length - 1;
    const routePath = index === 0 ? '/' : `/${seg.toLowerCase()}`;
    return (
      <Typography
        key={seg}
        component={isLast ? 'span' : Link}
        to={isLast ? undefined : routePath}
        sx={{
          color: isLast ? '#FFD700' : '#ffffff',
          fontWeight: isLast ? 700 : 600,
          fontSize: '0.9rem',
          ml: index === 0 ? 0 : 1,
          mr: index === 0 ? 0 : 1,
          textDecoration: isLast ? 'none' : 'underline',
          cursor: isLast ? 'default' : 'pointer',
          transition: 'color 0.2s ease, transform 0.2s ease',
          '&:hover': {
            color: isLast ? '#FFD700' : '#4fd1c5',
            transform: isLast ? 'none' : 'translateY(-1px)',
          },
        }}
      >
        {seg}
      </Typography>
    );
  });

  return (
    <AppBar position="static" sx={{ backgroundColor: '#000000' }}>
      <Toolbar sx={{ position: 'relative', minHeight: 72, px: 2, justifyContent: 'space-between' }}>
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontWeight: 900,
            color: '#E50914',
            textShadow: '0 0 15px rgba(255, 255, 255, 0.9)',
            textDecoration: 'none',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        >
          EVERFLIX Séries
        </Typography>

        <Box
          sx={{
            position: 'absolute',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            width: 'max-content',
            maxWidth: '50%',
          }}
        >
          {breadcrumbItems.reduce((acc, item, index) => {
            if (index > 0) {
              acc.push(
                <Typography key={`sep-${index}`} sx={{ color: '#ffffff', mx: 0.5, fontSize: '0.9rem' }}>
                  /
                </Typography>
              );
            }
            acc.push(item);
            return acc;
          }, [])}
        </Box>

        <IconButton
          size="large"
          color="inherit"
          aria-label="menu"
          sx={{ ml: 1, fontSize: '1.3rem', fontWeight: 'bold' }}
          onClick={handleMenuOpen}
        >
          ☰
        </IconButton>

        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          {navItems.map((item) => (
            <MenuItem
              key={item.path}
              component={Link}
              to={item.path}
              onClick={handleMenuClose}
              selected={location.pathname === item.path}
            >
              {item.label}
            </MenuItem>
          ))}
        </Menu>
      </Toolbar>
    </AppBar>
  );
}

export default NavBar;