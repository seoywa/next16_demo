import EventCard from "@/components/EventCard";
import { IEvent } from "@/database";
import { getSimilarEventBySlug } from "@/lib/actions/event.actions";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;

const EventDetailsItem = ({
  icon,
  alt,
  label,
}: {
  icon: string;
  alt: string;
  label: string;
}) => (
  <div className="flex-row-gap-2 items-center">
    <Image alt={alt} src={icon} width={17} height={17} />
    <p>{label}</p>
  </div>
);

const EventAgenda = ({ agendaItems }: { agendaItems: string[] }) => (
  <div className="agenda">
    <h2>Agenda</h2>
    <ul>
      {agendaItems.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  </div>
);

const EventTags = ({ tags }: { tags: string[] }) => (
  <div className="flex flex-row flex-wrap gap-1.5">
    {tags.map((tag) => (
      <div className="pill" key={tag}>
        {tag}
      </div>
    ))}
  </div>
);

const EventDetailsPage = async ({
  params,
}: {
  params: Promise<{ slug: string }>;
}) => {
  const { slug } = await params;

  const request = await fetch(`${BASE_URL}/api/events/${slug}`);

  const {
    event: {
      description,
      image,
      overview,
      date,
      time,
      location,
      mode,
      agenda,
      audience,
      tags,
      organizer,
    },
  } = await request.json();

  if (!description) return notFound();

  const bookings = 10;

  const similarEvents: IEvent[] = await getSimilarEventBySlug(slug);

  return (
    <section id="event">
      <div className="header">
        <h1>Event Description</h1>
        <p>{description}</p>
      </div>

      <div className="details">
        {/* LEFT SIDE */}
        <div className="content">
          <Image
            src={image}
            alt="Event banner"
            width={800}
            height={800}
            className="banner"
          />

          <section className="flex-col-gap-2">
            <h2>Overview</h2>
            <p>{overview}</p>
          </section>

          <section className="flex-col-gap-2">
            <h2>Event Details</h2>

            <EventDetailsItem
              icon="/icons/calendar.svg"
              alt="calendar"
              label={date}
            />
            <EventDetailsItem
              icon="/icons/clock.svg"
              alt="clock"
              label={time}
            />
            <EventDetailsItem
              icon="/icons/pin.svg"
              alt="location"
              label={location}
            />
            <EventDetailsItem icon="/icons/mode.svg" alt="mode" label={mode} />
            <EventDetailsItem
              icon="/icons/audience.svg"
              alt="audience"
              label={audience}
            />
          </section>

          <EventAgenda agendaItems={agenda} />

          <section className="flex-col-gap-2">
            <h2>Organizer</h2>
            <p>{organizer}</p>
          </section>

          <EventTags tags={tags} />
        </div>

        {/* RIGHT SIDE: BOOKING FORM */}
        <aside className="booking">
          <div className="signup-card">
            <h2>Book Your Spot Now</h2>
            {bookings > 10 ? (
              <p className="text-sm">
                Join {bookings} people who have already booked their spots
              </p>
            ) : (
              <p className="text-sm">Be the first to book your spot!</p>
            )}
          </div>
        </aside>
      </div>

      <div className="flex w-full gap-4 flex-col pt-20">
        <h2>Similar Events</h2>
        <div className="events">
          {similarEvents.length > 0 && similarEvents.map((similarEvent: IEvent) => (
            <EventCard key={similarEvent.title} {...similarEvent}/>
          ))}
        </div>
      </div>
    </section>
  );
};

export default EventDetailsPage;
