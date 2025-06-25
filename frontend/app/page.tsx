"use client";

import Hero from "./components/(Home)/Hero";
import FeaturedDestinations from "./components/(Home)/FeaturedDestination";
import TravelTips from "./components/(Home)/TravelTips";

export default function Home() {
    return (
        <>
            <div className="bg-white">
                <Hero />
                <FeaturedDestinations />
                <TravelTips />
            </div>
        </>
    );
}
