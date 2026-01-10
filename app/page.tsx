import EventCard from "@/components/EventCard";
import ExploreBtn from "@/components/ExploreBtn";
import { events } from "@/lib/constants";
import React from "react";

const Home = () => {
  return (
    <section>
      <h1 className="text-center">The hub for every developer</h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, Conferences. All in One Place.
      </p>

      <ExploreBtn />

      <div className="mt-20 space-y-7">
        <h3>Featured Events</h3>

        <ul className="events">
          {events.map((event) => (
              <EventCard {...event} key={event.slug}/>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Home;
