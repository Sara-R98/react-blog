import React from 'react';
import { useQuery } from '@apollo/client';
import { GET_POST_INFO } from '../graphql/queries';
import { useNavigate, useParams } from 'react-router-dom';
import Loader from '../shared/Loader';
import { Avatar, Box, Container, Divider, Grid, Typography } from '@mui/material';
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import sanitizeHtml from 'sanitize-html';
import CommentForm from '../comment/CommentForm';
import Comments from '../comment/Comments';

const BlogsPage = () => {

    const {slug} = useParams(); 
    const navigate = useNavigate();

    const {loading , data , error } = useQuery(GET_POST_INFO , {
        variables: {slug : slug}
    })

    if (loading) return <Loader />

    if (error) return <h1>something went wrong </h1>

    const {post : { title , coverPhoto , content , author : { avatar , name , field}  }} = data;

    return <Container maxWidth= "lg"  >
        <Grid container mt={10}>
            {/* title and backIcon */}
            <Grid 
                item xs= {12} 
                sx={{ display: "flex" ,
                justifyContent: "space-between" }} >

                <Typography 
                    component= "h2" 
                    variant="h4" 
                    color= "primary" 
                    fontWeight={700} >
                    {title}
                </Typography>

                <KeyboardReturnIcon 
                    color= "primary" 
                    sx={{fontSize: "50px"}} 
                    onClick= { ()=> navigate(-1)} />
            </Grid>
            {/* coverPhoto */}
            <Grid item xs={12} mt={6}>
                <img src={coverPhoto.url} alt="coverPost" width="100%" style={{borderRadius: 15 }} />
            </Grid>
            {/* content */}
            <Grid item xs={12} mt={6} >
                <div dangerouslySetInnerHTML={{
                    __html: sanitizeHtml(content.html) }} >
                </div>
            </Grid>
            {/* Divider */}
            <Grid item xs={12} mt={5}  >
                 <Divider variant='middle' />
            </Grid>
            {/* /Author */}
            <Grid item xs={12} mt={7} sx={{display: "flex" , alignItems: "center" }}>
                <Avatar 
                    src={avatar.url} 
                    sx={{ width: 80 , height: 80 , ml: 2 }}
                />
            <Box component= "div" >
                <Typography component= "p" variant= "h5" fontWeight={700}  >
                    {name}
                </Typography>
                <Typography component= "p" variant="p" fontWeight={700} color="text.secondary" >
                    {field}
                </Typography>
                </Box>
            </Grid>
            {/* commentForm */}
            <Grid item xs={12}>
                <CommentForm slug={slug} />
            </Grid>
            <Grid item xs={12}>
                <Comments slug={slug} />
            </Grid>
        </Grid>
           </Container>
};

export default BlogsPage;