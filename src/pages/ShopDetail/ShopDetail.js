import React, { useEffect, useState } from "react";
import MasterLayout from "../../layout/MasterLayout";
import BGC from "../../assets/images/banner-cart.png";
import BGC1 from "../../assets/images/Basket_duotone.png";
import { Link, useParams } from "react-router-dom";
import SwiperComponentShopDetails from "./components/SwiperComponents";
import { getAll, getById } from "../../api/productAPI";
import RelatedProduct from "./components/relatedProduct";
import { useDispatch } from "react-redux";
import { addToCart } from "../../features/slice/cartSlice";
import { notification } from "antd";
import { useForm } from 'react-hook-form'
import { getAllComment, storeComment, getIdComment } from "../../api/commentAPI";
import { Auth } from "../Auth";


function ShopDetail() {
    window.scroll(0, 0)
    const {
        register,
        formState: { errors },
        handleSubmit
    } = useForm()

    const [loading, setLoading] = useState(false)
    const [product, setProduct] = useState([])
    const [products, setProducts] = useState([])
    const { id } = useParams()
    const dispatch = useDispatch()
    const openNotificationWithIcon = (type, product) => {
        dispatch(addToCart(product))
        notification[type]({
            message: 'Đã thêm giỏ hàng',
            description:
                `Sản phẩm : ${product.name}`,
        });
    };
    useEffect(() => {
        const fetchData = async (id) => {
            setLoading(true)
            try {
                const { data: resPrd } = await getById(id)
                const { data: resPrds } = await getAll()
                const filterPrd = resPrds.data.filter(item => item.cate_id === resPrd.data.cate_id)
                setProduct(resPrd.data)
                setProducts(filterPrd)
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }
        fetchData(id)
    }, [id])

    const user = Auth.profile()

    const onHandSubmit = async (data, pro_id, user_id) => {
        const newData = {
            ...data,
            pro_id: product.id,
            user_id: user.id
        }

        // console.log(newData)
        await storeComment(newData)
        window.location.reload(`/detail/${id}`)
    }
    const [success, setSuccess] = useState([])
    const [comments, setComments] = useState([])
    console.log(comments)
    useEffect(() => {
        const getComments = async () => {
            try {
                const { data: comments } = await getIdComment(id)
                setComments(comments.data)
                const { success } = await getIdComment(id)
                setSuccess(success)
            } catch (error) {
                console.log(error)
            }
        }
        getComments()
    }, [])
    console.log(comments)
    const convertDate = (data) => {
        const date = new Date(data)
        return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`
      }
    return (
        <MasterLayout>
            {loading ? (
                <div>
                    <div className="d-flex justify-content-center mt-3">
                        <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    {!product ? (
                        <div className="text-center mt-3">
                            <span>
                                OMG <i className="fa fa-frown-o" aria-hidden="true" /> !
                            </span>
                            <div>
                                No Result
                            </div>
                        </div>
                    ) : (
                        <div>
                            <section className="breadcrumb-section set-bg"
                                style={{ backgroundImage: `url(${BGC})` }}
                            >
                                <div className="container">
                                    <div className="row">
                                        <div className="col-lg-12 text-center">
                                            <div className="breadcrumb__text">
                                                <h2>{product.name}</h2>
                                                <div className="breadcrumb__option">
                                                    <Link to="/">Trang chủ</Link>
                                                    <Link to="/">Danh Mục</Link>
                                                    <span>{product.name}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </section>
                            <div>
                                <section className="product-details spad">
                                    <div className="container">
                                        <div className="detail-product">
                                            <div className="row">
                                                <div className="col-lg-4 col-md-4">
                                                    <div className="product__details__pic">
                                                        <div className="product__details__pic__item">
                                                            <img className="product__details__pic__item--large"
                                                                src={product.image} alt="123" className="img-fluid" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-lg-8 col-md-8">
                                                    <div className="product__details__text">
                                                        <div className="title-big__all">{product.name}</div>
                                                        <div className="pb-2 d-flex">
                                                            <div className="mr-3">
                                                                <span className="fw-b fz18px">Giá: </span>
                                                                <span>
                                                                    {new Intl.NumberFormat('vi-VN', {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                    }).format(product.price)}
                                                                </span>
                                                            </div>
                                                            <div className="">
                                                                <span className="fw-b fz18px">Giá khuyến mãi: </span>
                                                                <span className="cl-red">
                                                                    {new Intl.NumberFormat('vi-VN', {
                                                                        style: 'currency',
                                                                        currency: 'VND'
                                                                    }).format(product.price - (product.price * product.sale / 100))}
                                                                </span>
                                                            </div>
                                                        </div>
                                                        <div className="pb-2 status">
                                                            <span className="fw-b fz18px">Tình trạng: </span>
                                                            {product.status !== 0 ? (
                                                                <span className="status-true">Còn hàng</span>
                                                            ) : (
                                                                <span className="status-fale">Hết hàng</span>
                                                            )}
                                                        </div>
                                                        <div className="pb-2 d-flex">
                                                            <span className="fw-b fz18px">Số lượng: </span>
                                                            <div className="pro-qty">
                                                                1
                                                            </div>
                                                        </div>
                                                        <div className="pb-2 price-ship">
                                                            <span className="fw-b fz18px">Phí ship: </span>
                                                            <span>
                                                                {new Intl.NumberFormat('vi-VN', {
                                                                    style: 'currency',
                                                                    currency: 'VND'
                                                                }).format(30000)}
                                                            </span>
                                                        </div>
                                                        <p>
                                                            {product.desc_short}
                                                        </p>
                                                        <div className="product__details__quantity mt-3 mb-3 d-flex align-items-center justify-content-end">
                                                            <div className="btn_add">
                                                                {product.status !== 0 ? (
                                                                    <button className="primary-btn"
                                                                        onClick={() => openNotificationWithIcon('success', product)}>
                                                                        <img src={BGC1} className="" />                                                                        Thêm vào giỏ hàng
                                                                    </button>
                                                                ) : (
                                                                    <Link to="/contact" className="primary-btn">
                                                                        Liên hệ
                                                                    </Link>
                                                                )}
                                                            </div>
                                                        </div>


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-lg-12">
                                            <div className="product__details__tab">
                                                <div className="mb-4">
                                                    <div className="title-big__all text-center titledetail_">
                                                        Chi tiết
                                                    </div>
                                                    <div className="content">
                                                        {product.description}
                                                    </div>
                                                </div>
                                                {user ? (
                                                    <div>
                                                        <form onSubmit={handleSubmit(onHandSubmit)} className="comment-no-ratting super big-form" >
                                                            <div className="row">
                                                                <div className="col-lg-6 col-md-6">
                                                                    <textarea name="content" placeholder="Mời bạn để lại bình luận..." {...register('content', { minLength: 5 })}
                                                                        error={errors.content}
                                                                    />
                                                                    {errors.content && (
                                                                        <div className="feedback mt-3 text-danger">
                                                                            Hãy nhập <b>bình luận tối thiểu 5 kí tự</b>
                                                                        </div>
                                                                    )}
                                                                    <div className="">
                                                                        <label className="fw-b fz18px  mb-3" for="cars">Điểm :</label>
                                                                        <select name="cars" id="cars" form="carform"{...register('vote')} className="form_select">
                                                                            <option value="">Lựa chọn</option>
                                                                            <option value="1">1</option>
                                                                            <option value="2">2</option>
                                                                            <option value="3">3</option>
                                                                            <option value="4">4</option>
                                                                            <option value="5">5</option>

                                                                        </select>
                                                                        <button type="submit" className="primary-btn d-block">Gửi bình luận</button>
                                                                    </div>
                                                                </div>

                                                            </div>
                                                        </form>

                                                    </div>
                                                ) : (
                                                    <a className="btn primary-btn" href="http://localhost:3000/login">Đăng nhập để bình luận</a>
                                                )
                                                }
                                                {comments == null ?
                                                    (
                                                        <div className="d-flex justify-content-center mt-5">
                                                            <div>
                                                                <div className="text-center">
                                                                    <i className="fas fa-database" />
                                                                </div>
                                                                <div>Không có dữ liệu</div>
                                                            </div>
                                                        </div>
                                                    ) :
                                                    (comments.map((data, index) => (
                                                        <div key={index}>
                                                            <p className="fw-b">{convertDate(data.created_at)}</p>
                                                            {data.content}
                                                        </div>
                                                    ))
                                                    )
                                                }
                                            </div>

                                        </div>
                                    </div>
                                </section>
                                <RelatedProduct products={products} loading={loading} />
                            </div>
                        </div>
                    )}
                </div>
            )}
        </MasterLayout>
    )
}

export default ShopDetail