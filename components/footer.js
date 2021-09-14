const navigation = {
  solutions: [
    {
      name: "Historical Places",
      href: "https://www.historicplaces.ca/en/rep-reg/place-lieu.aspx?id=2500",
    },
    { name: "R.M. of Silverwood", href: "https://myrm.info/123" },
    { name: "Whitewood", href: "http://townofwhitewood.ca/" },
    { name: "Whitewood Herald", href: "https://grasslandsnews.ca" },
    { name: "Whitewood Inn", href: "http://www.whitewoodinn.com/" },
    { name: "Whitewood Livestock", href: "http://www.whitewoodlivestock.ca/" },
  ],
  support: [
    { name: "Address: Box 58, Whitewood, SK S0G 5C0", href: "#" },
    { name: "Tel: 306.735.2344", href: "#" },
    { name: "Fax: 306.735.4495", href: "#" },
    { name: "Email:rm153@sasktel.net", href: "#" },
    { name: "Emergency: 911", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-gray-800" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Footer
      </h2>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="grid grid-cols-2 gap-8 xl:col-span-2">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <div>
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Local Links
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.solutions.map((item) => (
                    <li key={item.name}>
                      <a
                        href={item.href}
                        className="text-base text-gray-300 hover:text-white"
                      >
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="mt-12 md:mt-0">
                <h3 className="text-sm font-semibold text-gray-400 tracking-wider uppercase">
                  Office Information
                </h3>
                <ul role="list" className="mt-4 space-y-4">
                  {navigation.support.map((item) => (
                    <li key={item.name}>
                      <a className="text-base text-gray-300 hover:text-white">
                        {item.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 border-t border-gray-700 pt-8 md:flex md:items-center md:justify-between">
          <p className="mt-8 text-base text-gray-400 md:mt-0 md:order-1">
            &copy; 2021 RM of Willowdale No. 153
          </p>
        </div>
      </div>
    </footer>
  );
}
