import { useState } from 'react';

const Search = ({ onSearch, onClearSearch, isSearchApplied }) => {
    const [startPrice, setStartPrice] = useState('');
    const [endPrice, setEndPrice] = useState('');
    const [startCapacity, setStartCapacity] = useState('');
    const [endCapacity, setEndCapacity] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        onSearch(startPrice, endPrice, startCapacity, endCapacity);
    };

    return (
        <section className="hero-bg h-screen flex items-center justify-center bg-gray-800 bg-cover bg-no-repeat" style={{ backgroundImage: "url('pozadina.png')" }}>
            <div className="container mx-auto flex flex-col items-center justify-center h-full text-white text-center relative">
                <h1 className="text-4xl font-bold mb-4">Rezervišite svoju sobu i više od toga, dotaknite svoje snove!</h1>
                <form id="searchForm" className="flex flex-wrap space-x-2" onSubmit={handleSubmit}>
                {isSearchApplied && (
                    <button
                        className="text-white bg-red-600 rounded-full p-2"
                        onClick={onClearSearch}
                    >
                        X
                    </button>
                )}
                    <input
                        type="number"
                        placeholder="Cijena od"
                        className="px-4 py-2 rounded-lg text-black"
                        value={startPrice}
                        onChange={(e) => setStartPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Cijena do"
                        className="px-4 py-2 rounded-lg text-black"
                        value={endPrice}
                        onChange={(e) => setEndPrice(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Minimalni kapacitet"
                        className="px-4 py-2 rounded-lg text-black"
                        value={startCapacity}
                        onChange={(e) => setStartCapacity(e.target.value)}
                    />
                    <input
                        type="number"
                        placeholder="Maksimalni kapacitet"
                        className="px-4 py-2 rounded-lg text-black"
                        value={endCapacity}
                        onChange={(e) => setEndCapacity(e.target.value)}
                    />
                    <button type="submit" className="bg-red-600 px-4 py-2 rounded-r-lg">Pretraži</button>
                </form>
            </div>
        </section>
    );
};

export default Search;
