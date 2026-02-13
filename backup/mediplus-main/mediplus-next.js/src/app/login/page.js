import Breadcrumbs from "@/components/Breadcrumbs";
import Header from "@/components/Header/Header";
import Link from "next/link";

export default function login() {
  return (
    <>
      <Header />

      <Breadcrumbs title="Login" menuText="Login" />

      <section className="login section">
        <div className="container">
          <div className="inner">
            <div className="row">
              <div className="col-lg-6">
                <div className="login-left"></div>
              </div>
              <div className="col-lg-6">
                <div className="login-form">
                  <h2>Login Here</h2>
                  <p>
                    Didn&apos;t you account yet ?{" "}
                    <Link href="/register">Register Here</Link>
                  </p>

                  <form className="form" method="post" action="#">
                    <div className="row">
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="text"
                            name="name"
                            placeholder="First Name"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="email"
                            name="email"
                            placeholder="Your Email"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            placeholder="Password"
                          />
                        </div>
                      </div>
                      <div className="col-lg-6">
                        <div className="form-group">
                          <input
                            type="password"
                            name="password"
                            placeholder="Confirm Password"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group login-btn">
                          <button className="btn" type="submit">
                            Login
                          </button>
                        </div>
                        <div className="checkbox">
                          <div className="form-check">
                            <input
                              className="form-check-input"
                              type="checkbox"
                              value=""
                              id="flexCheckDefault"
                            />
                            <label
                              className="form-check-label"
                              for="flexCheckDefault"
                            >
                              Remember me
                            </label>
                          </div>
                        </div>
                        <Link href="#" className="lost-pass">
                          Lost your password ?
                        </Link>
                      </div>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
