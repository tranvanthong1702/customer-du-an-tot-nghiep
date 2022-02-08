import React, { useState, useEffect } from 'react'
import MasterLayout from "../../layout/MasterLayout";
import { Link } from "react-router-dom";
import { useParams } from 'react-router-dom'
import { getById } from "../../../src/api/blogAPI";
import BGC from "../../assets/images/banner-pages.png";
import { getAll } from "../../../src/api/blogAPI";


function Blog_Detail() {
    const [blog, setBlog] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: blogs } = await getAll()
                setBlog(blogs.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    const { id } = useParams();
    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        const getBlog = async () => {
            try {
                const { data: blogs } = await getById(id);
                setBlogs(blogs.data);
                console.log(blogs)
            } catch (error) {
                console.log(error)
            }
        }
        getBlog();
    }, [])
    const convertDate = (data) => {
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
    }
    return (<MasterLayout>
        <section className="breadcrumb-section set-bg"
            style={{ backgroundImage: `url(${BGC})` }}
        >        <div class="container">
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>{blogs.title}</h2>
                                <div className="breadcrumb__option">
                                    <a href="./index.html">Home</a>
                                    <span>Blog</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <section class="blog">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-md-3 order-md-1 order-2">
                        <div class="blog__sidebar">
                            <div className='fw-b fz18px mb-2'>
                                Tin mới
                            </div>
                            <div class="blog__sidebar__item">
                                {blog?.slice(0, 3).map((blog) => {
                                    return (
                                        <div className="blog__item mb-3" key={blog.id}>
                                            <Link to={`/blog-detail/${blog.id}`} className="img__">
                                                <img src={blog.image} alt={blog.name} className="w-full-image" />
                                            </Link>
                                            <div className="blog__item__text">
                                                <div className="title-blog">
                                                    <Link to={`/blog-detail/${blog.id}`}>{blog.title}</Link>
                                                </div>
                                                <div className="day-date">
                                                    <i className="fa fa-calendar-o" />{blog.created_at.slice(0, 10)}
                                                </div>
                                                <p>
                                                    {blog.content.slice(0, 100)}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                    <div class="col-lg-8 col-md-7 order-md-1 order-1">
                        <div class="blog__details__text">
                            <div className='title-big__all mb-3'>{blogs.title}</div>
                            <div className='day-date d-flex align-items-center mb-3'>
                            <i class="fa fa-calendar-o"></i>{convertDate(blogs.updated_at)}
                            </div>
                            <img src={blogs.image} width="70%" alt />
                            <p>{blogs.content}</p>
                        </div>
                    </div>
                </div>
            </div>
        </section></MasterLayout>)
}
export default Blog_Detail