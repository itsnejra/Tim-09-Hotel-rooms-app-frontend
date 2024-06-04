import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import "tailwindcss/tailwind.css";
import { useRouter } from "next/router";
import "react-image-gallery/styles/css/image-gallery.css";
import Header from "@/src/components/layout/header";
import Footer from "@/src/components/layout/footer";
import { fetchUserData } from "@/src/utils/fetch/fetchUserData";
import { MdEmail } from "react-icons/md";
import { FaPhoneAlt } from "react-icons/fa";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
const ContactUs = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userType, setUserType] = useState(null);
  const [userName, setUserName] = useState("");
  const [userId, setUserId] = useState("");

  const router = useRouter();

  useEffect(() => {
    const getUserData = async () => {
      const userData = await fetchUserData();
      setUserId(userData.userId);
      setUserName(userData.userName);
      setUserType(userData.userType);
      setIsLoggedIn(userData.isLoggedIn);
    };

    const accessToken = Cookies.get("accessToken");
    if (accessToken) {
      getUserData();
    } else {
      setIsLoggedIn(false);
    }
  });

  const handleLogout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    setIsLoggedIn(false);
    setUserType(null);
  };

  const handleLogin = () => {
    router.push("auth/login");
  };

  const handleRegister = () => {
    router.push("auth/register");
  };

  return (
    <div className="overflow-x-hidden">
      <Header
        isLoggedIn={isLoggedIn}
        userName={userName}
        userType={userType}
        handleLogout={handleLogout}
        handleLogin={handleLogin}
        handleRegister={handleRegister}
      />
      <div className="bg-gray-100">
<section className="text-center py-16 bg-cover bg-center relative" style={{ backgroundImage: "url('../public/about1')"}}>
    <div className="ml-20 mr-20">
  <div className="absolute inset-0 bg-black opacity-50"></div>
  <div className="relative">
    <h1 className="text-4xl font-bold text-white">Hotel Four Seasons</h1>
    <p className="mt-4 text-white">Uzdižući se iznad urbane raskoši, hotel Four Seasons na vrhu nudi beskompromisni luksuz i spektakularne poglede na panoramu grada. Svaki trenutak proveden u ovom ekskluzivnom utočištu predstavlja spoj elegancije i besprekorne usluge. Od vrhunskih restorana do besprekornih spa tretmana, gostima se pruža iskustvo koje ostavlja neizbrisiv trag u pamćenju. U Four Seasonsu na vrhu, svaki detalj je pažljivo osmišljen kako bi se stvorila atmosfera bezvremenog sjaja i nezaboravnog uživanja.</p>
  </div>
  </div>
</section>


    <section className="py-10">
      <div className="container mx-auto px-4">
        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Luksuzne sobe</h2>
          <div className="flex flex-wrap -mx-4">
          <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
  <img
    src="/about2.jpg"
    alt="Playful Meetings"
    className="rounded-lg shadow-lg"
    style={{ maxHeight: "500px" }} // Prilagodite visinu kako vam odgovara
  />
</div>

            <div className="w-full lg:w-1/2 px-4">
              <p className="mb-4"> Ove raskošne sobe i apartmani ne samo da pružaju spektakularne poglede na grad, već i postavljaju novi standard luksuza. Svaka soba je pažljivo osmišljena kako bi zadovoljila najistančanije ukuse, kombinujući savremeni dizajn sa tradicionalnom elegancijom.</p>
              <p className="mb-4">Gosti mogu uživati u prostranim krevetima sa luksuznom posteljinom, elegantno opremljenim kupatilima sa luksuznim toaletnim proizvodima, kao i u privatnim balkonima ili terasama gde se može uživati u zalasku sunca ili romantičnoj večeri pod zvezdama.

Tradicija hotela Four Seasons se odražava u besprekornoj usluzi i pažnji posvećenoj svakom detalju. Osoblje je tu da ispuni sve želje gostiju, bilo da je u pitanju organizacija posebnih događaja u sobi, preporuka za obilazak grada ili rezervacija u restoranu sa zvezdicom Michelin</p>
              <p className="mb-4">Za one koji žele dodatni luksuz, suiteovi hotela Four Seasons na vrhu pružaju prostrane prostorije za opuštanje i zabavu. Elegantne dnevne sobe sa udobnim garniturama idealne su za druženje sa prijateljima ili poslovnim sastancima, dok privatne trpezarije omogućavaju gostima da uživaju u intimnim večerama uz sjajan pogled na grad. Kada je reč o udobnosti, ništa nije prepušteno slučaju. Gosti mogu birati između različitih vrsta jastuka kako bi pronašli savršenu postavku za miran san, dok mekani bade mantili i papuče pružaju dodatni osećaj ugode nakon napornog dana.</p>
              <button className="bg-yellow-500 text-white py-2 px-4 rounded-lg">
                <Link href="/">Pregledaj sobe</Link>
                </button>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Specijalni događaji</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
              <p className="mb-4">Dobrodošli u svet ekskluzivnih događaja u hotelu Four Seasons, gde se svaki trenutak pretvara u nezaboravno iskustvo. Naša kolekcija specijalnih događaja obuhvata širok spektar jedinstvenih prilika za uživanje i proslavu u najprestižnijem okruženju.</p>
              <p className="mb-4">Od elegantnih gala večera do intimnih koktel zabava, naš tim stručnjaka za događaje posvećen je tome da svaki detalj vašeg specijalnog događaja bude besprekoran. Bilo da organizujete venčanje iz snova, rođendansku proslavu ili korporativni događaj, naša profesionalna usluga pruža personalizovan pristup koji zadovoljava i najzahtevnije ukuse.</p>
              <p className="mb-4">Naša ekskluzivna lokacija nudi raznovrsne prostore za sve vrste događaja. Luksuzne sale za bankete, prefinjene privatne sale za sastanke i prostrane terase sa panoramskim pogledom idealne su za svečane prilike. Naša ekipa kulinarskih stručnjaka priprema vrhunske menije koji će zadovoljiti i najistančanije ukuse, dok naši somelijeri rado preporučuju savršeno vino koje će upotpuniti vaše gastronomske doživljaje.

Osim toga, naši specijalni događaji često uključuju tematske večeri, muzičke nastupe i kulturne događaje koji dodatno obogaćuju iskustvo naših gostiju. Uz nas, svaki događaj postaje nezaboravan trenutak koji će se dugo prepričavati.</p>
            </div>
            <div className="w-full lg:w-1/2 px-4" style={{ marginTop: "-80px" }}>
  <img
    src="https://images.squarespace-cdn.com/content/v1/5f18420f3734db1079654907/1612196787212-53VSU4FFA53S18ASDBGE/sbm_hh_meeting_room_salle_eiffel_0011.jpg"
    alt="Special Events"
    className="rounded-lg shadow-lg"
  />
</div>

          </div>
        </div>

        <div className="mb-16">
          <h2 className="text-3xl font-semibold mb-6">Poslovni sastanci</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
              <img src="https://www.luxurybanyantreeresort.com/images/aminities/conference-hall/6.jpg"></img>
            </div>
            <div className="w-full lg:w-1/2 px-4">
              <p className="mb-4">Kada je reč o poslovnim sastancima, hotel Four Seasons postavlja standarde izvrsnosti i luksuza. Naša ponuda poslovnih sastanaka osmišljena je tako da zadovolji potrebe i najzahtevnijih poslovnih profesionalaca, pružajući besprijekornu uslugu i vrhunske sadržaje u prestižnom okruženju.</p>
              <p className="mb-4">Naša vrhunska lokacija omogućava lakoću pristupa, bilo da dolazite sa lokalne ili međunarodne destinacije. Hotel Four Seasons se ponosi svojom modernom infrastrukturom koja obuhvata prostrane i sofisticirane konferencijske sale, opremljene najnovijom tehnologijom. Naši prostori su fleksibilni i mogu se prilagoditi različitim formatima sastanaka, od intimnih sastanaka do velikih konferencija i seminara.</p>
              <p className="mb-4">Naš stručni tim za događaje posvećen je svakom detalju, osiguravajući da svaki aspekt vašeg sastanka bude savršeno koordiniran. Od tehničke podrške do personalizovanih usluga keteringa, sve je dizajnirano da vaši gosti budu impresionirani. Naši kulinarski stručnjaci pripremaju specijalizovane menije koji će zadovoljiti i najistančanije ukuse, omogućavajući vam da uživate u izvrsnim obrocima bez napuštanja prostora za sastanke.</p>

            </div>
          </div>
        </div>

        <div>
          <h2 className="text-3xl font-semibold mb-6">Ceremonije</h2>
          <div className="flex flex-wrap -mx-4">
            <div className="w-full lg:w-1/2 px-4 mb-8 lg:mb-0">
              <p className="mb-4">Tražite savršeno mjesto za proslavu vjenčanja, rođendana ili bilo kojeg događaja vrijednog proslave? Odbacite cipele i opustite se – vrijeme je za zabavu u našem hotelu.</p>
              <p className="mb-4">Što više, to bolje. Slavite kao srednjovjekovni kralj zaljubljen u rođendane u našoj svečanoj sali, organizujte ceremoniju dodjele nagrada vrijednu Oscara ili okupite porodicu za elegantnu vjenčanu ceremoniju – bilo šta što možete proslaviti, naš hotel može ugostiti. I mislimo baš na sve.</p>
              <p className="mb-4">Oduševite svoje goste elegantnim koktel satom, organizujte stilski aperitiv ili priredite gurmansku gozbu – naši kulinarski majstori će pripremiti izvanredne specijalitete koji će vašu proslavu učiniti zaista nezaboravnom.</p>
            </div>
            <div className="w-full lg:w-1/2 px-4" style={{ marginTop: "-80px" }}>
              <img src="https://symphony.cdn.tambourine.com/brown-hotel/media/28-Wedding-Reception-Seating-5a67833c6e167.jpg" alt="Celebrations" className="rounded-lg shadow-lg"></img>
            </div>
          </div>
        </div>
      </div>
    </section>
    <Footer/>
  </div>
  </div>
  );
};

export default ContactUs;