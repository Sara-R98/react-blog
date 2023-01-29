import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_BLOGS_INFO } from '../graphql/queries';
import { Grid } from '@mui/material';
import Loader from '../shared/Loader' ;
import CardEL from '../shared/CardEL';
import Paginate from '../shared/Paginate';

const Blogs = () => {
    const {loading , data , error} = useQuery(GET_BLOGS_INFO);
    // console.log(data);
    //paginate
    // const [currentPage , setCurrentPage] = useState(1);
    // const [postsPerPage] = useState(3);

    if(loading) return <Loader />
    if(error) return <h1> something went wrong </h1>

    //earn last and first index and put those in slice
    // const lastPostIndex= currentPage * postsPerPage;
    // const firstPostIndx= lastPostIndex - postsPerPage;
    // const currentPost = data.posts.slice(firstPostIndx , lastPostIndex);


    
    return (
        <Grid container spacing={2}>
            {data.posts.map((post) => (
                <Grid item xs={12} sm={6} md={4} key={post.id}>
                    <CardEL {...post} />
                    {/* <CardEL {...post} />  unvar props midim mizanim props.title masalan*/}
                </Grid>
            ))}
            {/* <Grid item xs={12} mt={3} sx={{alignItems: "center"}} >
                <Paginate 
                    postsPerPage= {postsPerPage} 
                    currentPost= {currentPost}
                    setCurrentPage={setCurrentPage}
                 />
            </Grid> */}
            {/* <Paginate 
             totalPost={data.posts.length}
             postsPerPage={postsPerPage}
             setCurrentPage={setCurrentPage} /> */}
        </Grid>
    );
};

export default Blogs;