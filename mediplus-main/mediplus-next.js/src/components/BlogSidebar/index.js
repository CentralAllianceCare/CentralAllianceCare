import Image from "next/image";
import Link from "next/link";

import BlogImg1 from "../../../public/img/blog-sidebar1.jpg";
import BlogImg2 from "../../../public/img/blog-sidebar2.jpg";
import BlogImg3 from "../../../public/img/blog-sidebar3.jpg";

export default function BlogSidebar() {
  return (
    <>
      <div className="main-sidebar">
        <div className="single-widget search">
          <div className="form">
            <input type="email" placeholder="Search Here..." />
            <Link className="button" href="#">
              <i className="fa fa-search"></i>
            </Link>
          </div>
        </div>

        <div className="single-widget category">
          <h3 className="title">Blog Categories</h3>
          <ul className="categor-list">
            <li>
              <Link href="#">Men&apos;s Apparel</Link>
            </li>
            <li>
              <Link href="#">Women&apos;s Apparel</Link>
            </li>
            <li>
              <Link href="#">Bags Collection</Link>
            </li>
            <li>
              <Link href="#">Accessories</Link>
            </li>
            <li>
              <Link href="#">Sun Glasses</Link>
            </li>
          </ul>
        </div>

        <div className="single-widget recent-post">
          <h3 className="title">Recent post</h3>

          <div className="single-post">
            <div className="image">
              <Image src={BlogImg1} alt="#" width={200} height={200} />
            </div>
            <div className="content">
              <h5>
                <Link href="#">We have annnocuced our new product.</Link>
              </h5>
              <ul className="comment">
                <li>
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  Jan 11, 2020
                </li>
                <li>
                  <i className="fa fa-commenting-o" aria-hidden="true"></i>
                  35
                </li>
              </ul>
            </div>
          </div>

          <div className="single-post">
            <div className="image">
              <Image src={BlogImg2} alt="#" width={200} height={200} />
            </div>
            <div className="content">
              <h5>
                <Link href="#">Top five way for solving teeth problems.</Link>
              </h5>
              <ul className="comment">
                <li>
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  Mar 05, 2019
                </li>
                <li>
                  <i className="fa fa-commenting-o" aria-hidden="true"></i>
                  59
                </li>
              </ul>
            </div>
          </div>

          <div className="single-post">
            <div className="image">
              <Image src={BlogImg3} alt="#" width={200} height={200} />
            </div>
            <div className="content">
              <h5>
                <Link href="#">We provide highly business soliutions.</Link>
              </h5>
              <ul className="comment">
                <li>
                  <i className="fa fa-calendar" aria-hidden="true"></i>
                  June 09, 2019
                </li>
                <li>
                  <i className="fa fa-commenting-o" aria-hidden="true"></i>
                  44
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="single-widget side-tags">
          <h3 className="title">Tags</h3>
          <ul className="tag">
            <li>
              <Link href="#">business</Link>
            </li>
            <li>
              <Link href="#">wordpress</Link>
            </li>
            <li>
              <Link href="#">html</Link>
            </li>
            <li>
              <Link href="#">multipurpose</Link>
            </li>
            <li>
              <Link href="#">education</Link>
            </li>
            <li>
              <Link href="#">template</Link>
            </li>
            <li>
              <Link href="#">Ecommerce</Link>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
