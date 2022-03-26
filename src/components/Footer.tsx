export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 font-circularstdbook">
      <div className="max-w-full mx-auto py-4 px-4 sm:px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="mt-8 md:mt-0 md:order-1">
          <p className="text-center text-base text-gray-400 text-xs">
            &copy; {new Date().getFullYear()} Ruby. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
