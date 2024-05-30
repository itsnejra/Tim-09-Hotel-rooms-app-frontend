
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-8">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-4 justify-center">
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2">O nama</h3>
                    <p className="text-gray-400 text-center">
                        Hotel Four Seasons predstavlja sinonim za luksuz, udobnost i vrhunsku uslugu. Smješten u srcu najprestižnijih destinacija širom sveta, naša misija je da gostima pružimo nezaboravan boravak uz pažljivo osmišljene sadržaje i besprekornu uslugu.
                    </p>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2">Kompanija</h3>
                    <ul className="text-gray-400 text-center">
                        <li><a href="#" className="hover:text-white">O nama</a></li>
                        <li><a href="#" className="hover:text-white">Kontaktirajte nas</a></li>
                        <li><a href="#" className="hover:text-white">Uslovi</a></li>
                    </ul>
                </div>
                <div className="flex flex-col items-center">
                    <h3 className="text-xl font-semibold mb-2">Grad</h3>
                    <ul className="text-gray-400 text-center">
                        <li><a href="#" className="hover:text-white">Cairo</a></li>
                        <li><a href="#" className="hover:text-white">Giza</a></li>
                        <li><a href="#" className="hover:text-white">Luxer</a></li>
                        <li><a href="#" className="hover:text-white">Aswan</a></li>
                    </ul>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
