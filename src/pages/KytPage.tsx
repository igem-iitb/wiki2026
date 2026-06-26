import styles from './kyt.module.css';
import TeamCard from '../components/TeamCard';
import Footer from '../components/Footer';

type Member = { name: string; photo: string; objectPosition?: string; zoom?: number };

type Section = {
  id: string;
  label: string;
  panelImage: string;
  members: Member[];
  layout: 'two' | 'three' | 'four' | 'six';
};

const sections: Section[] = [
  {
    id: 'pi',
    label: 'PROJECT INVESTIGATOR',
    panelImage: '/knowurteam/investigator.png',
    members: [
      { name: 'Prof. Saket Choudhary', photo: '/members/profSaket.png', objectPosition: 'center 100%', zoom: 1.3 },
      { name: 'Prof. Rajesh Patkar', photo: '/members/profRajesh.png', objectPosition: 'center 0%' },
    ],
    layout: 'two',
  },
  {
    id: 'pl',
    label: 'PROJECT LEADS',
    panelImage: '/knowurteam/teamlead.png',
    members: [
      { name: 'Aarohi Gupta', photo: '/members/aaorhi.jpg', objectPosition: 'center 0%', zoom: 1.0 },
      { name: 'Angel Singhvi', photo: '/members/angel-singhvi.jpg', objectPosition: 'center -20%', zoom: 1 },
    ],
    layout: 'two',
  },
  {
    id: 'wl',
    label: 'WET LAB',
    panelImage: '/knowurteam/wetleb.png',
    members: [
      { name: 'Durva Sachin Saraf', photo: '/members/durva.jpg', objectPosition: 'center 0%' },
      { name: 'Madhur', photo: '/members/madhur.jpg', objectPosition: 'center 60%', zoom: 1.1 },
      { name: 'Ranit S Sooraj', photo: '/members/ranit.jpg', objectPosition: 'center 40%', zoom: 1.2 },
      { name: 'Hardika Jain', photo: '/members/hardika-jain.png', objectPosition: 'center 40%', zoom: 1.1 },
      { name: 'Aayush Gupta', photo: '/members/aayush-gupta.jpg', objectPosition: 'center 10%' },
      { name: 'Abhinav Gupta', photo: '/members/abhinav.jpg', objectPosition: 'center 50%' },
      { name: 'Manish S', photo: '/members/manish.jpg', objectPosition: 'center 30%', zoom: 1.1 },
    ],
    layout: 'four',
  },
  {
    id: 'dl',
    label: 'DRY LAB',
    panelImage: '/knowurteam/drylab.png',
    members: [
      { name: 'Arhan Khade', photo: '/members/arhan.jpg', objectPosition: 'center 0%' },
      { name: 'Bipra Bhanu Mohanty', photo: '/members/bipra-bhanu-mohanty.jpg', objectPosition: 'center 15%' },
      { name: 'Ishaan Chhaya', photo: '/members/ishaan.jpg', objectPosition: 'center 10%' },
      { name: 'Pratik Rahul Ingle', photo: '/members/pratik.jpeg', objectPosition: 'center 10%' },
      { name: 'Siddhant Chowdhary', photo: '/members/siddhant.jpg', objectPosition: 'center 50%', zoom: 2 },
      { name: 'Ekansh', photo: '/members/ekansh.jpg', objectPosition: 'center 20%', zoom: 1.7 },
      { name: 'Gururatna Upadhyay', photo: '/members/guru.png', objectPosition: 'center 20%', zoom: 1.2 },
    ],
    layout: 'four',
  },
  {
    id: 'hp',
    label: 'HUMAN PRACTICES',
    panelImage: '/knowurteam/human.png',
    members: [
      { name: 'Yashika', photo: '/members/yashika.jpg', objectPosition: 'center 40%', zoom: 1.3 },
      { name: 'Arnav Oza', photo: '/members/arnav.jpg', objectPosition: 'center 30%' },
      { name: 'Tanish Jain', photo: '/members/tanish.jpg', objectPosition: 'center 10%', zoom: 1.1 },
      { name: 'Shinjini Jain', photo: '/members/shinjini.jpg', objectPosition: 'center top', zoom: 1 },
      { name: 'Latisha Meena', photo: '/members/latisha.jpg', objectPosition: 'center top', zoom: 1 },
      { name: 'Mitali Arya', photo: '/members/mitali.jpg', objectPosition: 'center 20%', zoom: 1 },
    ],
    layout: 'six',
  },
  {
    id: 'web',
    label: 'WEB',
    panelImage: '/knowurteam/web.png',
    members: [
      { name: 'Sagnik Dey', photo: '/members/sagnik_dey.png', objectPosition: 'center 0%', zoom: 1.0 },
      { name: 'Nisarg Rathod', photo: '/members/nisarg-rathod.jpg', objectPosition: 'center 3%' },
      { name: 'Aryan Prasad', photo: '/members/aryan-prasad.png', objectPosition: 'center 35%' },
    ],
    layout: 'six',
  },
];

export default function KytPage() {
  return (
    <div className="min-h-screen bg-white overflow-x-hidden flex flex-col">
      {/* Hero Section */}
      <section className={styles.hero}>
        <img
          src="/team_pic.png"
          alt="iGEM IIT Bombay Team"
          className={styles.heroImage}
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
        <div className={styles.heroOverlay}>
          <h1 className={styles.heroTitle} style={{ lineHeight: 1.1 }}>
            TEAM<br />PHOTO
          </h1>
        </div>
      </section>

      {/* Folder Sections */}
      <div className="w-full flex flex-col items-center">
        {sections.map((section, idx) => (
          <section
            key={section.id}
            className="w-full relative flex flex-col items-center"
            style={{
              marginTop: idx === 0 ? '2vw' : '-14vw',
              zIndex: idx + 1
            }}
          >
            {/* Background Panel Image */}
            <div className="absolute inset-0 w-full h-full pointer-events-none">
              <img
                src={section.panelImage}
                alt={`${section.label} Background`}
                className="w-full h-full object-fill"
              />
            </div>

            {/* Content Container */}
            <div
              className="relative z-10 w-full max-w-[1440px] mx-auto flex flex-col items-center px-4 sm:px-8"
              style={{
                paddingTop: 'clamp(120px, 24vw, 350px)',
                paddingBottom: 'clamp(80px, 16vw, 230px)'
              }}
            >
              {section.layout === 'two' ? (
                <div className="mx-auto grid grid-cols-2 w-[80%] sm:w-[65%] md:w-[55.8%] gap-x-[8%]">
                  {section.members.map((member, i) => (
                    <TeamCard
                      key={i}
                      name={member.name}
                      photo={member.photo}
                      objectPosition={member.objectPosition}
                      zoom={member.zoom}
                    />
                  ))}
                </div>
              ) : section.layout === 'four' ? (
                <div className="mx-auto w-[92%] sm:w-[85%] md:w-[80%] flex flex-col items-center gap-y-14">
                  {/* Row 1: first 3 */}
                  <div className="grid grid-cols-3 w-[75%] sm:w-[70%] md:w-[65%] gap-x-[6%]">
                    {section.members.slice(0, 3).map((member, i) => (
                      <TeamCard
                        key={i}
                        name={member.name}
                        photo={member.photo}
                        objectPosition={member.objectPosition}
                        zoom={member.zoom}
                      />
                    ))}
                  </div>
                  {/* Row 2: remaining 4 */}
                  <div className="grid grid-cols-4 w-[95%] sm:w-[92%] md:w-[90%] gap-x-[8%]">
                    {section.members.slice(3).map((member, i) => (
                      <TeamCard
                        key={i + 3}
                        name={member.name}
                        photo={member.photo}
                        objectPosition={member.objectPosition}
                        zoom={member.zoom}
                      />
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mx-auto grid grid-cols-2 sm:grid-cols-3 w-[90%] sm:w-[80%] md:w-[74.5%] gap-x-[5%] sm:gap-x-[8%] md:gap-x-[15.4%] gap-y-[5%]">
                  {section.members.map((member, i) => (
                    <TeamCard
                      key={i}
                      name={member.name}
                      photo={member.photo}
                      objectPosition={member.objectPosition}
                      zoom={member.zoom}
                    />
                  ))}
                </div>
              )}
            </div>
          </section>
        ))}
      </div>

      {/* Footer */}
      <Footer bgColor="#ffffff" />
    </div>
  );
}
