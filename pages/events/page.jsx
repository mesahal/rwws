import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Clock, MapPin, Users, ArrowRight } from "lucide-react";

export const metadata = {
  title: "Events Calendar - Hope Foundation",
  description:
    "Upcoming events, fundraisers, volunteer opportunities, and more",
};

// Mock data (would come from API in production)
const events = [
  {
    id: 1,
    title: "Annual Charity Gala",
    description:
      "Join us for an evening of inspiration and giving at our annual fundraising gala. The event includes dinner, entertainment, silent auction, and inspiring stories from the communities we serve.",
    date: "July 15, 2025",
    time: "6:00 PM - 10:00 PM",
    location: "Grand Metropolitan Hotel, New York",
    type: "Fundraiser",
    image:
      "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    attendees: 250,
    registration: true,
  },
  {
    id: 2,
    title: "Volunteer Training Workshop",
    description:
      "A comprehensive training session for new volunteers joining our global initiatives. Learn about our programs, policies, and how to make the most impact in your volunteer role.",
    date: "August 5, 2025",
    time: "9:00 AM - 4:00 PM",
    location: "Hope Foundation Headquarters, Chicago",
    type: "Training",
    image:
      "https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    attendees: 50,
    registration: true,
  },
  {
    id: 3,
    title: "Community Health Fair",
    description:
      "Free health screenings and education for underserved communities. Services include blood pressure checks, diabetes screening, nutrition counseling, and more.",
    date: "September 20, 2025",
    time: "10:00 AM - 3:00 PM",
    location: "Central Park Community Center, Los Angeles",
    type: "Community Event",
    image:
      "https://images.unsplash.com/photo-1576091160550-2173dba999ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    attendees: 500,
    registration: false,
  },
  {
    id: 4,
    title: "Global Water Summit",
    description:
      "A conference bringing together experts, practitioners, and advocates to discuss innovative solutions to the global water crisis.",
    date: "October 10-12, 2025",
    time: "9:00 AM - 5:00 PM",
    location: "International Conference Center, Washington DC",
    type: "Conference",
    image:
      "https://images.unsplash.com/photo-1541252260730-0412e8e2108e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    attendees: 300,
    registration: true,
  },
  {
    id: 5,
    title: "Charity Run for Education",
    description:
      "5K run/walk to raise funds for our education programs worldwide. All proceeds go directly to building schools and providing educational resources.",
    date: "November 8, 2025",
    time: "8:00 AM - 12:00 PM",
    location: "Riverside Park, Boston",
    type: "Fundraiser",
    image:
      "https://images.unsplash.com/photo-1533560904424-a0c61dc306fc?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    attendees: 1000,
    registration: true,
  },
  {
    id: 6,
    title: "Holiday Giving Drive",
    description:
      "Annual collection of donations for families in need during the holiday season. Donate gifts, food, clothing, and essential supplies.",
    date: "December 1-15, 2025",
    time: "Various Times",
    location: "Multiple Locations Nationwide",
    type: "Donation Drive",
    image:
      "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    attendees: null,
    registration: false,
  },
  {
    id: 7,
    title: "Youth Leadership Summit",
    description:
      "Empowering young leaders to create positive change in their communities through workshops, mentoring, and collaborative projects.",
    date: "January 20-22, 2026",
    time: "9:00 AM - 4:00 PM",
    location: "University Conference Center, Seattle",
    type: "Training",
    image:
      "https://images.unsplash.com/photo-1526976668912-1a811878dd37?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    attendees: 150,
    registration: true,
  },
  {
    id: 8,
    title: "Virtual Fundraising Concert",
    description:
      "Online concert featuring renowned artists supporting our cause. Stream from anywhere in the world and donate to support our programs.",
    date: "February 14, 2026",
    time: "7:00 PM - 10:00 PM",
    location: "Online (Virtual Event)",
    type: "Fundraiser",
    image:
      "https://images.unsplash.com/photo-1501386761578-eac5c94b800a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80",
    attendees: null,
    registration: true,
  },
];

// Group events by month
const groupEventsByMonth = (events) => {
  const grouped = {};

  events.forEach((event) => {
    const date = new Date(event.date);
    const monthYear = `${date.toLocaleString("default", {
      month: "long",
    })} ${date.getFullYear()}`;

    if (!grouped[monthYear]) {
      grouped[monthYear] = [];
    }

    grouped[monthYear].push(event);
  });

  return grouped;
};

export default function EventsPage({ searchParams }) {
  const eventTypes = [
    "All Types",
    "Fundraiser",
    "Training",
    "Community Event",
    "Conference",
    "Donation Drive",
  ];
  const groupedEvents = groupEventsByMonth(events);
  const months = Object.keys(groupedEvents);

  // If no month is selected, use the first month
  const currentMonth = searchParams?.month || months[0];
  const currentEvents = groupedEvents[currentMonth] || [];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-primary to-chart-3 text-white py-16">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-40"></div>
          <Image
            src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80"
            alt="Events Calendar"
            fill
            style={{ objectFit: "cover" }}
            priority
          />
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold mb-4">Events Calendar</h1>
            <p className="text-xl mb-0">
              Join us for upcoming events, fundraisers, volunteer opportunities,
              and more.
            </p>
          </div>
        </div>
      </section>

      {/* Events Calendar */}
      <section className="py-12 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sidebar */}
            <div className="w-full md:w-64 space-y-6">
              {/* Month Selection */}
              <div>
                <h3 className="text-lg font-bold mb-3">Browse by Month</h3>
                <div className="space-y-2">
                  {months.map((month) => (
                    <Button
                      key={month}
                      variant={month === currentMonth ? "default" : "ghost"}
                      className="w-full justify-start"
                      asChild
                    >
                      <Link href={`/events?month=${encodeURIComponent(month)}`}>
                        <Calendar className="h-4 w-4 mr-2" />
                        {month}
                      </Link>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Event Type Filter */}
              <div>
                <h3 className="text-lg font-bold mb-3">Event Type</h3>
                <div className="space-y-2">
                  {eventTypes.map((type) => (
                    <div key={type} className="flex items-center">
                      <input
                        type="checkbox"
                        id={type}
                        className="h-4 w-4 rounded border-gray-300 text-primary focus:ring-primary"
                        defaultChecked={type === "All Types"}
                      />
                      <label htmlFor={type} className="ml-2 text-sm">
                        {type}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Add to Calendar */}
              <Card>
                <CardContent className="p-4">
                  <h3 className="font-bold mb-2">Add to Your Calendar</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Never miss an event by subscribing to our calendar.
                  </p>
                  <div className="space-y-2">
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" /> Google Calendar
                    </Button>
                    <Button variant="outline" size="sm" className="w-full">
                      <Calendar className="h-4 w-4 mr-2" /> iCal/Outlook
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Events List */}
            <div className="flex-1">
              <Tabs defaultValue="list" className="w-full">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-2xl font-bold">{currentMonth}</h2>
                  <div className="flex items-center">
                    <span className="text-sm text-muted-foreground mr-2">
                      View:
                    </span>
                    <TabsList className="grid w-full grid-cols-2 w-[200px]">
                      <TabsTrigger value="list">List</TabsTrigger>
                      <TabsTrigger value="grid">Grid</TabsTrigger>
                    </TabsList>
                  </div>
                </div>

                <TabsContent value="list" className="mt-0">
                  <div className="space-y-6">
                    {currentEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="flex flex-col md:flex-row">
                          <div className="relative w-full md:w-1/3 h-48 md:h-auto">
                            <Image
                              src={event.image}
                              alt={event.title}
                              fill
                              style={{ objectFit: "cover" }}
                            />
                            <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                              {event.type}
                            </div>
                          </div>
                          <div className="p-6 flex-1">
                            <h3 className="text-xl font-bold mb-2">
                              {event.title}
                            </h3>
                            <p className="text-muted-foreground mb-4">
                              {event.description}
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mb-4">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 text-primary mr-2" />
                                <span className="text-sm">{event.date}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock className="h-4 w-4 text-primary mr-2" />
                                <span className="text-sm">{event.time}</span>
                              </div>
                              <div className="flex items-center">
                                <MapPin className="h-4 w-4 text-primary mr-2" />
                                <span className="text-sm">
                                  {event.location}
                                </span>
                              </div>
                              {event.attendees && (
                                <div className="flex items-center">
                                  <Users className="h-4 w-4 text-primary mr-2" />
                                  <span className="text-sm">
                                    {event.attendees} Attendees
                                  </span>
                                </div>
                              )}
                            </div>
                            <div className="flex justify-end">
                              <Button asChild>
                                <Link href={`/events/${event.id}`}>
                                  {event.registration
                                    ? "Register Now"
                                    : "Learn More"}
                                </Link>
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="grid" className="mt-0">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="relative h-48">
                          <Image
                            src={event.image}
                            alt={event.title}
                            fill
                            style={{ objectFit: "cover" }}
                          />
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                            {event.type}
                          </div>
                        </div>
                        <CardHeader>
                          <CardTitle>{event.title}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <CardDescription className="mb-4">
                            {event.description.substring(0, 100)}...
                          </CardDescription>
                          <div className="space-y-2">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm">{event.date}</span>
                            </div>
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm">{event.time}</span>
                            </div>
                            <div className="flex items-center">
                              <MapPin className="h-4 w-4 text-primary mr-2" />
                              <span className="text-sm">{event.location}</span>
                            </div>
                          </div>
                        </CardContent>
                        <CardFooter>
                          <Button asChild className="w-full">
                            <Link href={`/events/${event.id}`}>
                              {event.registration
                                ? "Register Now"
                                : "Learn More"}
                            </Link>
                          </Button>
                        </CardFooter>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </section>

      {/* Host Your Own Event */}
      <section className="py-16 bg-muted">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6">
                Host Your Own Fundraiser
              </h2>
              <p className="text-lg mb-6">
                Want to make a bigger impact? Host your own fundraising event to
                support our cause. We provide resources, guidance, and support
                to help make your event a success.
              </p>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Birthday fundraisers</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Community events</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>School and campus fundraisers</span>
                </li>
                <li className="flex items-start">
                  <div className="bg-primary/10 p-1 rounded-full mr-2 mt-1">
                    <ArrowRight className="h-4 w-4 text-primary" />
                  </div>
                  <span>Athletic events and challenges</span>
                </li>
              </ul>
              <Button asChild>
                <Link href="/host-event">Get Started</Link>
              </Button>
            </div>
            <div className="relative h-80 md:h-96 rounded-lg overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-1.2.1&auto=format&fit=crop&w=1050&q=80"
                alt="Fundraising event"
                fill
                style={{ objectFit: "cover" }}
                className="rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
