import { Sidebar } from "flowbite-react";

export default function UserSidebar({ display }) {
  return (
    <Sidebar className="h-auto bg-rose-900" id="sidebar">
      <Sidebar.Items className="text-center">
        <Sidebar.ItemGroup>
          <Sidebar.Item
            href="/my-account"
            className={`text-white border-b border-white hover:bg-rose-900 rounded-none ${
              display === "my-account" && "font-semibold text-lg"
            }`}
          >
            MY ACCOUNT
          </Sidebar.Item>
          <Sidebar.Item
            href="/my-orders"
            className={`text-white border-b border-white hover:bg-rose-900 rounded-none ${
              display === "my-orders" && "font-semibold text-lg"
            }`}
          >
            ORDERS
          </Sidebar.Item>
          <Sidebar.Item
            href="/payments"
            className={`text-white border-b border-white hover:bg-rose-900 rounded-none ${
              display === "my-payments" && "font-semibold text-lg"
            }`}
          >
            PAYMENTS
          </Sidebar.Item>
          <Sidebar.Item
            href="/event"
            className={`text-white border-b border-white hover:bg-rose-900 rounded-none ${
              display === "events" && "font-semibold text-lg"
            }`}
          >
            EVENTS
          </Sidebar.Item>
        </Sidebar.ItemGroup>
      </Sidebar.Items>
    </Sidebar>
  );
}
