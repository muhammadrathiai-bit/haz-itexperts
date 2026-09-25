const nextConfig = {
  trailingSlash: false,

  async redirects() {
    return [
      // Short links used on print and in person
      { source: "/checkup", destination: "/lp/it-ai-checkup?source=print", permanent: false },
      { source: "/check", destination: "/tools/email-security-check", permanent: false },
      { source: "/fix", destination: "/lp/email-security-fix?source=short", permanent: false },
      // Self-booking page for the free Checkup (Google Calendar appointment schedule on supremeitexperts@gmail.com)
      {
        source: "/book",
        destination:
          "https://calendar.google.com/calendar/appointments/schedules/AcZssZ2ecqLF7x5X1lOEKso7b-FYKFlI22lj2rBNX0h73WQe6-Nje-eet0PXg4hX7P0DX2hLI7upZmi9",
        permanent: false,
      },
      // Brochure QR (first version) pointed at the contact page
      {
        source: "/contact",
        has: [{ type: "query", key: "source", value: "brochure" }],
        destination: "/lp/it-ai-checkup",
        permanent: false,
      },

      { source: "/locations/philadelphia-pa", destination: "/areas", permanent: true },
      { source: "/locations/wilmington-de", destination: "/areas", permanent: true },
      { source: "/areas/philadelphia", destination: "/areas", permanent: true },
      { source: "/areas/wilmington", destination: "/areas", permanent: true },

      { source: "/locations/philadelphia-pa/", destination: "/areas", permanent: true },
      { source: "/locations/wilmington-de/", destination: "/areas", permanent: true },
      { source: "/areas/philadelphia/", destination: "/areas", permanent: true },
      { source: "/areas/wilmington/", destination: "/areas", permanent: true },

      { source: "/areas/philadelphia/:path*", destination: "/areas", permanent: true },
      { source: "/areas/wilmington/:path*", destination: "/areas", permanent: true },
      { source: "/areas/philadelphia/:path*/", destination: "/areas", permanent: true },
      { source: "/areas/wilmington/:path*/", destination: "/areas", permanent: true },
    ];
  },

  async headers() {
    return [
      {
        source: "/(sitemap.xml|robots.txt)",
        headers: [{ key: "Cache-Control", value: "public, max-age=300, must-revalidate" }],
      },
      {
        // Partner give-aways: shareable by link, kept out of search results
        source: "/partners/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex, nofollow" }],
      },
    ];
  },
};

export default nextConfig;
