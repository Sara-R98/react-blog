import React from 'react';
import HomePage from './components/home/HomePage';
import Layout from './components/layout/Layout';
import { Route, Routes } from 'react-router-dom';
import AuthorsPage from './components/author/AuthorsPage';
import BlogsPage from './components/blog/BlogsPage';
import ScrollToTop from './components/shared/ScrollToTop';
// import RtlProvider from './components/shared/RtlProvider';



const App = () => {
    return (
            <Layout>
                <ScrollToTop />
                {/* <RtlProvider> */}
                <Routes>
                    <Route path="/" element= {<HomePage />} />
                    <Route path="/authors/:slug" element= {<AuthorsPage />} />
                    <Route path="/blogs/:slug" element= {<BlogsPage />} />
                </Routes>
                {/* </RtlProvider> */}
            </Layout>
    );
};

export default App;