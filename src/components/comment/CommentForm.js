import React, { useState } from 'react';
import { Button, Grid, TextField, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';
import { SEND_COMMENT } from '../graphql/mutation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import RtlProvider from '../shared/RtlProvider';


const CommentForm = ({slug}) => {

    const [commentData , setCommentData] = useState ({
        name : "" ,
        email: "" ,
        text: ""
    })
    const [pressed , setPressed] = useState(false)

    const changeHandler = (event) => {

        setCommentData({...commentData , [event.target.name] : event.target.value })

    }

    const { name , email , text } = commentData;

    const [sendComment , {loading , data}] = useMutation(SEND_COMMENT , {
        variables: { 
            name: name ,
            email: email ,
            text: text ,
            slug: slug  
        }
    });

    const sendHandler = (e) => {
        if( name && email && text){
            sendComment()
            setPressed(true)
        }else {
            toast.warn( " تمامی فیلد ها را پر کنید" , {
                position: "top-center"
            })
            
        }
    }

    if(data && pressed) {
        toast.success("کامنت ارسال شد و منتظر تایید میباشد." , {
            position: "top-center"
        })
        setPressed(false)
        setCommentData({ name: "" , email: "" , text: "" })
    }

    return (
        <RtlProvider>
        <Grid container 
        sx={{ 
            boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px" , 
            borderRadius: 5 , 
            py: 2 , 
            mt: 5
        }}
        >
           <Grid item xs= {12} m={2} >
                <Typography component= "p" variant="h6" fontWeight={700} color= "primary">
                    فرم ارسال کامنت
                </Typography>
            </Grid> 
            
            <Grid item xs={12} m={2} >
               <TextField 
                    label= " نام کاربری" 
                    variant= "outlined" 
                    sx={{width: "100%"}} 
                    value={name} 
                    name= "name" 
                    onChange={changeHandler}
               />
            </Grid>
                
            <Grid item xs={12} m={2} >
               <TextField 
                    label= " ایمیل " 
                    variant= "outlined" 
                    sx={{width: "100%"}}
                    value={email} 
                    name= "email" 
                    onChange={changeHandler}
                    />
            </Grid>
            <Grid item xs={12} m={2} >
               <TextField 
                    label= " متن کامنت " 
                    variant= "outlined" 
                    sx={{width: "100%"}} 
                    value={text} 
                    name="text" 
                    onChange={changeHandler}
                    multiline
                    minRows={4}  
                    />
            </Grid>
            <Grid item xs={12} m={2} >
               {loading ? <Button variant="contained" disabled > در حال ارسال  </Button> :
               <Button variant= 'contained' onClick= {sendHandler} > ارسال </Button> }
            </Grid>
            <ToastContainer />
        </Grid>
                    
     </RtlProvider>
    );
};

export default CommentForm;


// import React, { useEffect, useState } from 'react';
// import { Button, Grid, TextField, Typography } from '@mui/material';
// import { useMutation } from '@apollo/client';
// import { SEND_COMMENT } from '../graphql/mutation';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import { validate } from './validate';

// const CommentForm = ({slug}) => {

//     const [commentData , setCommentData] = useState ({
//         name : "" ,
//         email: "" ,
//         text: ""
//     })

//     const [errors , setErrors] = useState({});
//     const [touched , setTouched] = useState({})

//     useEffect(()=>{
//         setErrors(validate(commentData))
//         // console.log(errors)
//     } , [commentData , touched])

//     const focusHandler = (e) =>{
//         setTouched({...touched , [e.target.name] : true })
//     }

//     const changeHandler = (event) => {

//         setCommentData({...commentData , [event.target.name] : event.target.value })

//     }

//     const { name , email , text } = commentData;

//     const [sendComment , {loading , data}] = useMutation(SEND_COMMENT , {
//         variables: { 
//             name: name ,
//             email: email ,
//             text: text ,
//             slug: slug  
//         }
//     });

//     const sendHandler = () => {
//         if(!Object.keys(errors).length){
//             sendComment()
//         }else {
//             toast.warn( " تمامی فیلد ها را پر کنید" , {
//                 position: "top-center" ,
            // setTouched({
            //     name: true,
            //     email: true,
            // })
//             })
//         }
//     }

//     if(data) {
//         toast.success("کامنت ارسال شد و منتظر تایید میباشد." , {
//             position: "top-center"
//         })
//     }

//     return (
//         <Grid container 
//             sx={{ 
//                 boxShadow: "rgba(0,0,0,0.1) 0px 4px 12px" , 
//                 borderRadius: 5 , 
//                 py: 2 , 
//                 mt: 5
//                }}
//         >
//            <Grid item xs= {12} m={2} >
//                 <Typography component= "p" variant="h6" fontWeight={700} color= "primary">
//                     فرم ارسال کامنت
//                 </Typography>
//             </Grid> 
//             <Grid item xs={12} m={2} >
//                <TextField 
//                     label= " نام کاربری" 
//                     variant= "outlined" 
//                     sx={{width: "100%"}} 
//                     value={name} 
//                     name= "name" 
//                     onChange={changeHandler}
//                     onFocus={focusHandler} 
//                />
//                {errors.name && touched.name && <span> {errors.name} </span>}
//             </Grid>
//             <Grid item xs={12} m={2} >
//                <TextField 
//                     label= " ایمیل " 
//                     variant= "outlined" 
//                     sx={{width: "100%"}}
//                     value={email} 
//                     name= "email" 
//                     onChange={changeHandler}
//                     onFocus={focusHandler} 
//                 />
//                 {errors.email && touched.email && <span> {errors.email} </span>}
//             </Grid>
//             <Grid item xs={12} m={2} >
//                <TextField 
//                     label= " متن کامنت " 
//                     variant= "outlined" 
//                     sx={{width: "100%"}} 
//                     value={text} 
//                     name="text" 
//                     onChange={changeHandler}
//                     onFocus={focusHandler}
//                     multiline
//                     minRows={4}  
//                />
//                {errors.text && touched.text && <span> {errors.text} </span>}
//             </Grid>
//             <Grid item xs={12} m={2} >
//                {loading ? <Button variant="contained" disabled > در حال ارسال  </Button> :
//                <Button variant= 'contained' onClick= {sendHandler} > ارسال </Button> }
//             </Grid>
//             <ToastContainer />
//         </Grid>
//     );
// };

// export default CommentForm;