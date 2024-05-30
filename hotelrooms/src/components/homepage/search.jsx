
const Search = () => {
    return (
        <section className="hero-bg h-screen flex items-center justify-center bg-gray-800 bg-cover bg-no-repeat" style={{backgroundImage: "url('pozadina.png')"}}>
            <div className="container mx-auto flex flex-col items-center justify-center h-full text-white text-center">
                <h1 className="text-4xl font-bold mb-4">Rezervišite svoju sobu i više od toga, dotaknite svoje snove!</h1>
                <form id="searchForm" className="flex flex-wrap space-x-2">
                    <input id="priceFromInput" type="number" placeholder="Cijena od" className="px-4 py-2 rounded-lg text-black" />
                    <input id="priceToInput" type="number" placeholder="Cijena do" className="px-4 py-2 rounded-lg text-black" />
                    <input id="capacityInput" type="number" placeholder="Minimalni kapacitet" className="px-4 py-2 rounded-lg text-black"/>
                    <input id="capacityInput" type="number" placeholder="Maksimalni kapacitet" className="px-4 py-2 rounded-lg text-black" />
                    <button id="searchButton" className="bg-red-600 px-4 py-2 rounded-r-lg">Pretraži</button>
                </form>
            </div>
        </section>
    )
}

export default Search;