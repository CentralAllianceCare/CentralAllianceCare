import Link from "next/link";
import Image from "next/image";

import Breadcrumbs from "@/components/Breadcrumbs";
import Comments from "./Comments";
import Form from "./Form";
import BlogSidebar from "@/components/BlogSidebar";

import BlogImg1 from "../../../public/img/blog1.jpg";
import BlogImg2 from "../../../public/img/blog2.jpg";
import BlogImg3 from "../../../public/img/blog3.jpg";
import AuthorImg from "../../../public/img/author1.jpg";
import Header from "@/components/Header/Header";

export default function BlogSingle() {
  return (
    <>
      <Header />

      <Breadcrumbs title="Blog Single" menuText="Blog Single" />

      <section className="news-single section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="row">
                <div className="col-12">
                  <div className="single-main">
                    <div className="news-head">
                      <Image src={BlogImg1} alt="#" width={557} height={373} />
                    </div>

                    <h1 className="news-title">
                      <Link href="news-single.html">
                        More than 80 clinical trials launch to test of the
                        coronavirus .
                      </Link>
                    </h1>

                    <div className="meta">
                      <div className="meta-left">
                        <span className="author">
                          <Link href="#">
                            <Image
                              src={AuthorImg}
                              alt="#"
                              width={455}
                              height={455}
                            />
                            Naimur Rahman
                          </Link>
                        </span>
                        <span className="date">
                          <i className="fa fa-clock-o"></i>03 Feb 2019
                        </span>
                      </div>
                      <div className="meta-right">
                        <span className="comments">
                          <Link href="#">
                            <i className="fa fa-comments"></i>05 Comments
                          </Link>
                        </span>
                        <span className="views">
                          <i className="fa fa-eye"></i>33K Views
                        </span>
                      </div>
                    </div>

                    <div className="news-text">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse facilisis ultricies tortor, nec sollicitudin
                        lorem sagittis vitae. Curabitur rhoncus commodo rutrum.
                        Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Aliquam nec lacus
                        pulvinar, laoreet dolor quis, pellentesque ante. Cras
                        nulla orci, pharetra at dictum consequat, pretium
                        pretium nulla. Suspendisse porttitor nunc a sodales
                        tempor. Mauris sed felis maximus, interdum metus vel,
                        tincidunt diam.
                      </p>
                      <p>
                        Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Aliquam nec lacus
                        pulvinar, laoreet dolor quis, pellentesque ante. Cras
                        nulla orci, pharetra at dictum consequat, pretium
                        pretium nulla. Suspendisse porttitor nunc a sodales
                        tempor. Mauris sed felis maximus, interdum metus vel,
                        tincidunt diam. Nam ac risus vitae sem vehicula egestas.
                        Sed velit nulla, viverra non commod
                      </p>
                      <div className="image-gallery">
                        <div className="row">
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="single-image">
                              <Image
                                src={BlogImg2}
                                alt="#"
                                width={557}
                                height={373}
                              />
                            </div>
                          </div>
                          <div className="col-lg-6 col-md-6 col-12">
                            <div className="single-image">
                              <Image
                                src={BlogImg3}
                                alt="#"
                                width={557}
                                height={373}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse facilisis ultricies tortor, nec sollicitudin
                        lorem sagittis vitae. Curabitur rhoncus commodo rutrum.
                        Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Aliquam nec lacus
                        pulvinar, laoreet dolor quis, pellentesque ante. Cras
                        nulla orci, pharetra at dictum consequat, pretium
                        pretium nulla. Suspendisse porttitor nunc a sodales
                        tempor. Mauris sed felis maximus, interdum metus vel,
                        tincidunt diam.
                      </p>
                      <blockquote className="overlay">
                        <p>
                          Aliquam nec lacus pulvinar, laoreet dolor quis,
                          pellentesque ante. Cras nulla orci, pharetra at dictum
                          consequat, pretium pretium nulla. Suspendisse
                          porttitor nunc a sodales tempor. Mauris sed felis
                          maximus, interdum metus vel, tincidunt diam. Nam ac
                          risus vitae sem vehicula egestas. Sed velit nulla,
                          viverra non commodo et, sodales
                        </p>
                      </blockquote>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse facilisis ultricies tortor, nec sollicitudin
                        lorem sagittis vitae. Curabitur rhoncus commodo rutrum.
                        Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Aliquam nec lacus
                        pulvinar, laoreet dolor quis, pellentesque ante. Cras
                        nulla orci, pharetra at dictum consequat, pretium
                        pretium nulla. Suspendisse porttitor nunc a sodales
                        tempor. Mauris sed felis maximus, interdum metus vel,
                        tincidunt diam. Nam ac risus vitae sem vehicula egestas.
                        Sed velit nulla, viverra non commodo et, sodales id dui.
                      </p>
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Suspendisse facilisis ultricies tortor, nec sollicitudin
                        lorem sagittis vitae. Curabitur rhoncus commodo rutrum.
                        Pellentesque habitant morbi tristique senectus et netus
                        et malesuada fames ac turpis egestas. Aliquam nec lacus
                        pulvinar, laoreet dolor quis, pellentesque ante. Cras
                        nulla orci, pharetra at dictum consequat, pretium
                        pretium nulla. Suspendisse
                      </p>
                    </div>
                    <div className="blog-bottom">
                      <ul className="social-share">
                        <li className="facebook">
                          <Link href="#">
                            <i className="fa fa-facebook"></i>
                            <span>Facebook</span>
                          </Link>
                        </li>
                        <li className="twitter">
                          <Link href="#">
                            <i className="fa fa-twitter"></i>
                            <span>Twitter</span>
                          </Link>
                        </li>
                        <li className="google-plus">
                          <Link href="#">
                            <i className="fa fa-google-plus"></i>
                          </Link>
                        </li>
                        <li className="linkedin">
                          <Link href="#">
                            <i className="fa fa-linkedin"></i>
                          </Link>
                        </li>
                        <li className="pinterest">
                          <Link href="#">
                            <i className="fa fa-pinterest"></i>
                          </Link>
                        </li>
                      </ul>

                      <ul className="prev-next">
                        <li className="prev">
                          <Link href="#">
                            <i className="fa fa-angle-double-left"></i>
                          </Link>
                        </li>
                        <li className="next">
                          <Link href="#">
                            <i className="fa fa-angle-double-right"></i>
                          </Link>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
                <div className="col-12">
                  <Comments />
                </div>
                <div className="col-12">
                  <Form />
                </div>
              </div>
            </div>
            <div className="col-lg-4 col-12">
              <BlogSidebar />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
