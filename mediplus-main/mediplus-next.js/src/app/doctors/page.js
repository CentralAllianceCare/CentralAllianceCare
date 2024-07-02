import Breadcrumbs from "@/components/Breadcrumbs";
import TeamCard from "@/components/TeamCard";

import TeamImg1 from "../../../public/img/team1.jpg";
import TeamImg2 from "../../../public/img/team2.jpg";
import TeamImg3 from "../../../public/img/team3.jpg";
import TeamImg4 from "../../../public/img/team4.jpg";
import Header from "@/components/Header/Header";

export default function Doctors() {
  return (
    <>
      <Header />

      <Breadcrumbs title="Meet Our Qualified Doctors" menuText="Doctors" />

      <section id="team" className="team section single-page">
        <div className="container">
          <div className="row">
            <div className="col-lg-4 col-md-6 col-12">
              <TeamCard
                tilt="tilt-disable"
                image={TeamImg1}
                name="Collis Molate"
                desgination="Neurosurgeon"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <TeamCard
                tilt="tilt-disable"
                image={TeamImg2}
                name="Domani Plavon"
                desgination="Neurosurgeon"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <TeamCard
                tilt="tilt-disable"
                image={TeamImg3}
                name="John Mard"
                desgination="Dental Surgeon"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <TeamCard
                tilt="tilt-disable"
                image={TeamImg4}
                name="Amanal Frond"
                desgination="Neurosurgeon"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <TeamCard
                tilt="tilt-disable"
                image={TeamImg1}
                name="Collis Molate"
                desgination="Neurosurgeon"
              />
            </div>
            <div className="col-lg-4 col-md-6 col-12">
              <TeamCard
                tilt="tilt-disable"
                image={TeamImg2}
                name="Domani Plavon"
                desgination="Neurosurgeon"
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
