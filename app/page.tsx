import { Suspense } from "react";
import ExploreBtn from "@/components/ExploreBtn";
import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getAllEvents } from "@/lib/actions/event.actions";
import { events as defaultEvents } from "@/lib/constants";

const EventsGrid = async () => {
  let events: IEvent[] = [];
  try {
    events = await getAllEvents();
  } catch (error) {
    console.error("Failed to fetch events:", error);
  }

  const displayedEvents = events && events.length > 0 ? events : defaultEvents;

  return (
    <ul className="events">
      {displayedEvents &&
        displayedEvents.length > 0 &&
        displayedEvents.map((event) => (
          <li key={event.title} className="list-none">
            <EventCard {...event} />
          </li>
        ))}
    </ul>
  );
};

const Page = () => {
  return (
    <section>
      <h1 className="text-center">
        The Hub for Every Dev <br /> Event You Can't Miss
      </h1>
      <p className="text-center mt-5">
        Hackathons, Meetups, and Conferences, All in One Place
      </p>

      <ExploreBtn />

      <div id="events" className="mt-20 space-y-7 scroll-mt-24">
        <h3>Featured Events</h3>

        <Suspense
          fallback={
            <div className="grid md:grid-cols-3 gap-10 sm:grid-cols-2 grid-cols-1">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="h-[380px] rounded-lg bg-dark-200/50 animate-pulse"
                />
              ))}
            </div>
          }
        >
          <EventsGrid />
        </Suspense>
      </div>
    </section>
  );
};

export default Page;