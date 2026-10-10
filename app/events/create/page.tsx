'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

const PRESET_IMAGES = [
  { label: 'Event 1 (Neon Cyber)', url: '/images/event1.png' },
  { label: 'Event 2 (Cloud Blue)', url: '/images/event2.png' },
  { label: 'Event 3 (Tech Summit)', url: '/images/event3.png' },
  { label: 'Event 4 (Dev Conference)', url: '/images/event4.png' },
  { label: 'Event 5 (AI & Next)', url: '/images/event5.png' },
  { label: 'Event 6 (Hackathon)', url: '/images/event6.png' },
  { label: 'Event Full (Wide Banner)', url: '/images/event-full.png' },
];

export default function CreateEventPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState({
    title: '',
    description: '',
    overview: '',
    location: '',
    venue: '',
    date: '',
    time: '10:00 AM',
    mode: 'In-Person',
    audience: 'Developers, Tech Enthusiasts',
    organizer: '',
    tags: 'Tech, Dev, Innovation',
    agenda: 'Keynote & Welcome\nTechnical Sessions & Deep Dive\nNetworking & Wrap Up',
    image: '/images/event1.png',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const payload = {
        ...form,
        tags: form.tags.split(',').map((t) => t.trim()).filter(Boolean),
        agenda: form.agenda.split('\n').map((a) => a.trim()).filter(Boolean),
      };

      const res = await fetch('/api/events', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || data.message || 'Failed to create event');
      }

      const slug = data.event?.slug;
      if (slug) {
        router.push(`/events/${slug}`);
      } else {
        router.push('/#events');
      }
      router.refresh();
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      setLoading(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto py-10 px-4">
      <div className="flex items-center gap-3 mb-8">
        <Link
          href="/"
          className="text-light-200 hover:text-white transition flex items-center gap-1.5 text-sm"
        >
          ← Back to Home
        </Link>
      </div>

      <div className="text-center mb-10">
        <h1 className="text-4xl sm:text-5xl font-bold">Create New Event</h1>
        <p className="text-light-200 mt-3 text-base">
          Share your upcoming hackathon, conference, or meetup with the global dev community.
        </p>
      </div>

      <div className="bg-dark-100 border border-dark-200 rounded-[12px] p-6 sm:p-10 card-shadow">
        {error && (
          <div className="mb-6 p-4 rounded-lg bg-red-950/60 border border-red-500/50 text-red-200 text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Title */}
          <div className="flex flex-col gap-2">
            <label className="text-light-100 text-sm font-medium">Event Title *</label>
            <input
              type="text"
              name="title"
              required
              placeholder="e.g. Next.js Developer Meetup 2026"
              value={form.title}
              onChange={handleChange}
              className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Description */}
          <div className="flex flex-col gap-2">
            <label className="text-light-100 text-sm font-medium">Description *</label>
            <textarea
              name="description"
              required
              rows={3}
              placeholder="A comprehensive summary of the event purpose and experience..."
              value={form.description}
              onChange={handleChange}
              className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Overview */}
          <div className="flex flex-col gap-2">
            <label className="text-light-100 text-sm font-medium">Overview / Highlights *</label>
            <textarea
              name="overview"
              required
              rows={2}
              placeholder="Brief overview highlighting key takeaways and speaker highlights..."
              value={form.overview}
              onChange={handleChange}
              className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Row: Location, Venue & Mode */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-light-100 text-sm font-medium">Location *</label>
              <input
                type="text"
                name="location"
                required
                placeholder="e.g. Banglore, INDIA"
                value={form.location}
                onChange={handleChange}
                className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-light-100 text-sm font-medium">Venue *</label>
              <input
                type="text"
                name="venue"
                required
                placeholder="e.g. Tech Park Convention Hall"
                value={form.venue}
                onChange={handleChange}
                className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-light-100 text-sm font-medium">Mode *</label>
              <select
                name="mode"
                value={form.mode}
                onChange={handleChange}
                className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              >
                <option value="In-Person">In-Person</option>
                <option value="Online">Online</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Row: Date, Time & Organizer */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-light-100 text-sm font-medium">Date *</label>
              <input
                type="date"
                name="date"
                required
                value={form.date}
                onChange={handleChange}
                className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-light-100 text-sm font-medium">Time *</label>
              <input
                type="text"
                name="time"
                required
                placeholder="e.g. 10:00 AM"
                value={form.time}
                onChange={handleChange}
                className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-light-100 text-sm font-medium">Organizer *</label>
              <input
                type="text"
                name="organizer"
                required
                placeholder="e.g. Dev Community Org"
                value={form.organizer}
                onChange={handleChange}
                className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Audience & Tags */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="text-light-100 text-sm font-medium">Target Audience *</label>
              <input
                type="text"
                name="audience"
                required
                placeholder="e.g. Frontend Developers, Full-Stack Engineers"
                value={form.audience}
                onChange={handleChange}
                className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-light-100 text-sm font-medium">Tags (comma separated) *</label>
              <input
                type="text"
                name="tags"
                required
                placeholder="e.g. Next.js, React, AI, Web3"
                value={form.tags}
                onChange={handleChange}
                className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Agenda */}
          <div className="flex flex-col gap-2">
            <label className="text-light-100 text-sm font-medium">Agenda (one item per line) *</label>
            <textarea
              name="agenda"
              required
              rows={3}
              placeholder="Keynote Speech&#10;Hands-on Workshop&#10;Q&A and Networking"
              value={form.agenda}
              onChange={handleChange}
              className="bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
            />
          </div>

          {/* Poster Image Selection */}
          <div className="flex flex-col gap-3">
            <label className="text-light-100 text-sm font-medium">
              Event Banner Poster * (Pick a preset or enter URL)
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-3">
              {PRESET_IMAGES.map((preset) => (
                <button
                  type="button"
                  key={preset.url}
                  onClick={() => setForm({ ...form, image: preset.url })}
                  className={`group relative rounded-lg overflow-hidden border-2 transition-all p-0.5 cursor-pointer ${
                    form.image === preset.url
                      ? 'border-primary ring-2 ring-primary/40'
                      : 'border-dark-200 hover:border-gray-500'
                  }`}
                >
                  <div className="aspect-[4/3] relative w-full overflow-hidden rounded-md">
                    <Image
                      src={preset.url}
                      alt={preset.label}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform"
                    />
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-2">
              <input
                type="text"
                name="image"
                placeholder="Or paste an image URL (/images/event1.png or https://...)"
                value={form.image}
                onChange={handleChange}
                className="w-full bg-dark-200 border border-dark-200 rounded-[6px] px-4 py-2.5 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              />
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="bg-primary hover:bg-primary/90 text-black font-semibold rounded-[6px] py-3 px-6 mt-4 cursor-pointer transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {loading ? (
              <span>Publishing Event...</span>
            ) : (
              <span>Publish Event</span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
