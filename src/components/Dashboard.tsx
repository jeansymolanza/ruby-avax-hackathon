import Listing from './Listing';
import Cart from './Cart';

export default function Dashboard() {
  return (
    <>
      <div className="h-full flex">
        <div className="flex flex-col min-w-0 flex-1 overflow-hidden">
          <div className="flex-1 relative z-0 flex overflow-hidden">
            <main className="flex-1 relative z-0 overflow-y-auto focus:outline-none">
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <Listing />
              </div>
            </main>
            <aside className="hidden relative xl:flex xl:flex-col flex-shrink-0 w-96 border-l border-gray-200 overflow-y-auto">
              <div className="absolute inset-0 py-6 px-4 sm:px-6 lg:px-8">
                <Cart />
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
