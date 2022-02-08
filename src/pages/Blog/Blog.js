import React, { useEffect, useState } from "react";
import MasterLayout from "../../layout/MasterLayout";
import { Link } from "react-router-dom";
import { getAll } from "../../../src/api/blogAPI";
import BGC from "../../assets/images/banner-cart.png";
function Blog() {

    const [blogs, setBlogs] = useState([])
    useEffect(() => {
        const fetchData = async () => {
            try {
                const { data: blogs } = await getAll()
                setBlogs(blogs.data)
            } catch (error) {
                console.log(error)
            }
        }
        fetchData()
    }, [])
    return (
        <MasterLayout>
            <section className="breadcrumb-section set-bg bg-dark" style={{ backgroundImage: `url(${BGC})` }}>
                <div className="container">
                    <div className="row">
                        <div className="col-lg-12 text-center">
                            <div className="breadcrumb__text">
                                <h2>Blog</h2>
                                <div className="breadcrumb__option">
                                    <a href="./index.html">Home</a>
                                    <span>Blog</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section><section className="blog spad">
                <div className="container">
                    <div className="row">
                        {blogs?.map((blog) => {
                            return (
                                <div className="col-lg-3 col-md-3 col-sm-3 mb-3" key={blog.id}>
                                    <div className="blog__item">
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
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>

        </MasterLayout>

    )
}

export default Blog