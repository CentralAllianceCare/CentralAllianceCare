import Link from "next/link";

import BlogCard from "@/components/BlogCard";
import BlogSidebar from "@/components/BlogSidebar";
import Breadcrumbs from "@/components/Breadcrumbs";

import BlogImg1 from "../../../public/img/blog1.jpg";
import BlogImg2 from "../../../public/img/blog2.jpg";
import BlogImg3 from "../../../public/img/blog3.jpg";
import Header from "@/components/Header/Header";

export default function BlogGrid() {
  return (
    <>
      <Header />

      <Breadcrumbs title="Blog Grid" menuText="Blog Grid" />

      <section className="blog grid section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8 col-12">
              <div className="row">
                <div className="col-lg-6 col-md-6 col-12">
                  <BlogCard
                    image={BlogImg1}
                    date="22 Aug, 2020"
                    title="We have annnocuced our new product."
                    desc="Lorem ipsum dolor a sit ameti, consectetur adipisicing elit, sed do eiusmod tempor incididunt sed do incididunt sed."
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <BlogCard
                    image={BlogImg2}
                    date="15 Jul, 2020"
                    title="Top five way for solving teeth problems."
                    desc="Lorem ipsum dolor a sit ameti, consectetur adipisicing elit, sed do eiusmod tempor incididunt sed do incididunt sed."
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <BlogCard
                    image={BlogImg3}
                    date="05 Jan, 2020"
                    title="We provide highly business soliutions."
                    desc="Lorem ipsum dolor a sit ameti, consectetur adipisicing elit, sed do eiusmod tempor incididunt sed do incididunt sed."
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <BlogCard
                    image={BlogImg3}
                    date="05 Jan, 2020"
                    title="We provide highly business soliutions."
                    desc="Lorem ipsum dolor a sit ameti, consectetur adipisicing elit, sed do eiusmod tempor incididunt sed do incididunt sed."
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <BlogCard
                    image={BlogImg1}
                    date="22 Aug, 2020"
                    title="We have annnocuced our new product."
                    desc="Lorem ipsum dolor a sit ameti, consectetur adipisicing elit, sed do eiusmod tempor incididunt sed do incididunt sed."
                  />
                </div>
                <div className="col-lg-6 col-md-6 col-12">
                  <BlogCard
                    image={BlogImg2}
                    date="15 Jul, 2020"
                    title="Top five way for solving teeth problems."
                    desc="Lorem ipsum dolor a sit ameti, consectetur adipisicing elit, sed do eiusmod tempor incididunt sed do incididunt sed."
                  />
                </div>
                <div className="col-12">
                  <div className="pagination">
                    <ul className="pagination-list">
                      <li>
                        <Link href="#">
                          <i className="icofont-rounded-left"></i>
                        </Link>
                      </li>
                      <li className="active">
                        <Link href="#">1</Link>
                      </li>
                      <li>
                        <Link href="#">2</Link>
                      </li>
                      <li>
                        <Link href="#">3</Link>
                      </li>
                      <li>
                        <Link href="#">
                          <i className="icofont-rounded-right"></i>
                        </Link>
                      </li>
                    </ul>
                  </div>
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
