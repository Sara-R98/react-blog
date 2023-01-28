import { Fragment, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_CATEGORIES } from '../graphql/queries';
import { AppBar, Container, Button, Toolbar, Typography, Menu, MenuItem } from '@mui/material';
import LaptopChromebookIcon from '@mui/icons-material/LaptopChromebook';
import { Link } from 'react-router-dom';
import { styled, alpha } from '@mui/material/styles';
import { KeyboardArrowDown } from '@mui/icons-material';


const StyledMenu = styled((props) => (
    <Menu
      elevation={0}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      {...props}
    />
  ))(({ theme }) => ({
    '& .MuiPaper-root': {
      borderRadius: 6,
      marginTop: theme.spacing(1),
      minWidth: 180,
      color:
        theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
      boxShadow:
        'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
      '& .MuiMenu-list': {
        padding: '4px 0',
      },
      '& .MuiMenuItem-root': {
        '& .MuiSvgIcon-root': {
          fontSize: 18,
          color: theme.palette.text.secondary,
          marginRight: theme.spacing(1.5),
        },
        '&:active': {
          backgroundColor: alpha(
            theme.palette.primary.main,
            theme.palette.action.selectedOpacity,
          ),
        },
      },
    },
  }));


const Header = () => {

    const [anchorEl , setAnchorEl] = useState(null);

     const open = Boolean(anchorEl);

     const openHandler = (event) => {
        setAnchorEl(event.currentTarget)
     }

     const closeHandler = () => {
         setAnchorEl(null)
    }



    const {loading , data} = useQuery(GET_CATEGORIES);
    if (loading) return null;
    console.log(data)


    return (
        <div>
           <AppBar position="sticky" >
            <Container maxWidth= "lg" sx={{height: "100px"}}>
                <Toolbar>
                <Typography component= "h1" variant="h5" fontWeight="700" flex={1}>
                    <Link to= "/" style={{ textDecoration: "none" , color: "#fff" }}>
                        وبلاگ 
                    </Link>   
                </Typography> 
                <Link to="/"  style={{color: "#fff"}}>
                    <LaptopChromebookIcon />
                </Link> 
                </Toolbar>

                {/* <Button
                  id="demo-customized-button"
                  aria-controls = {open ? 'demo-customized-menu' : undefined}                  
                  aria-haspopup = "true"
                  aria-expanded = {open ? 'true' : undefined}
                  variant='text'
                  sx= {{color : "#fff"}}
                  disableElevation
                  onClick={openHandler}
                  endIcon= {<KeyboardArrowDown sx={{ mr: 1 }} />}
                  >
                    دسته بندی  
                </Button>
                <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={closeHandler}
                        >

                        {data.categories.map((category) => (
                        <MenuItem key={category.id}>
                        {category.name}
                        {category.categoryChildren && category.categoryChildren.map((child)=>(

                            <Fragment >
                            <Button
                            //  id="basic-menu"
                            //  aria-controls = {open ? 'basic-menu' : undefined}                  
                             aria-haspopup = "true"
                             aria-expanded = {!open ? 'false' : undefined}
                             variant='text'
                             sx= {{color : "#fff"}}
                             disableElevation
                             onClick={openHandler}
                             endIcon= {<KeyboardArrowDown sx={{ mr: 1 }} />}
                             >

                            </Button>

                            <StyledMenu
                        id="demo-customized-menu"
                        MenuListProps={{
                          'aria-labelledby': 'demo-customized-button',
                        }}
                        anchorEl={anchorEl}
                        open={open}
                        onClose={closeHandler}>

                            <MenuItem  >
                               {child.name}
                            </MenuItem>
                        </StyledMenu>

                           </Fragment>
                        ))}
                        </MenuItem>        

                        ))}    
                </StyledMenu> */}

            </Container>
           </AppBar> 
        </div>
    );
};

export default Header;