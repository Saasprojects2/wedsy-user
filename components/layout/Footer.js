import { Footer } from "flowbite-react";
import Link from "next/link";
import {
  BsFacebook,
  BsLinkedin,
  BsInstagram,
  BsTwitter,
  BsSendFill,
  BsChevronUp,
} from "react-icons/bs";

export default function FooterComponent() {
  return (
    <>
      <Footer container className="bg-[#f2eae7]">
        <div className="w-full">
          <div className="grid w-full grid-cols-1 gap-8 px-6 py-8 md:grid-cols-4">
            <div>
              <Footer.Title title="WEDDING IDEAS" className="text-[#b03138]" />
              <Footer.LinkGroup col className="space-y-2 list-disc">
                <Footer.Link href="#">Wedding Blog</Footer.Link>
                <Footer.Link href="#">Wedding Gallery</Footer.Link>
                <Footer.Link href="#">Real Wedding</Footer.Link>
                <Footer.Link href="#">Submit Wedding</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="START PLANNING" className="text-[#b03138]" />
              <Footer.LinkGroup col className="space-y-2 list-disc">
                <Footer.Link href="#">Venues</Footer.Link>
                <Footer.Link href="#">Shop</Footer.Link>
                <Footer.Link href="#">LGBTQ Wedding</Footer.Link>
                <Footer.Link href="#">Contact Us</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="QUICK LINKS" className="text-[#b03138]" />
              <Footer.LinkGroup col className="space-y-2 list-disc">
                <Footer.Link href="#">About Wedsy</Footer.Link>
                <Footer.Link href="#">Join As A User</Footer.Link>
                <Footer.Link href="#">Join As A Vendor</Footer.Link>
                <Footer.Link href="#">Careers</Footer.Link>
                <Footer.Link href="#">Contact Us</Footer.Link>
                <Footer.Link href="#">Privacy Policy</Footer.Link>
                <Footer.Link href="#">Terms and Conditions</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title
                title="SUBSCRIBE NEWSLETTER"
                className="text-[#b03138] mb-4"
              />
              <div className="flex flex-row rounded-full bg-white items-center w-full">
                <input
                  type="text"
                  className="grow border-0 rounded-full focus:ring-0"
                  placeholder="Enter your mail"
                />
                <div className="bg-[#902e27] h-auto rounded-full px-3 self-stretch items-center justify-center flex">
                  <BsSendFill color={"white"} size={16} />
                </div>
              </div>
              <Footer.Title
                title="GET IN TOUCH"
                className="text-[#b03138] mt-6"
              />
              <Footer.LinkGroup col className="space-y-2">
                <Footer.Link href="#">enquiry@wedsy.in</Footer.Link>
                <Footer.Link href="#">+91 76192 47482</Footer.Link>
                <Footer.Link href="#">
                  #14, HM Geneva House, Cunningham Road, Banglore
                </Footer.Link>
              </Footer.LinkGroup>
              <div className="md:mt-4 flex space-x-6 sm:mt-0">
                <Footer.Icon href="#" icon={BsFacebook} />
                <Footer.Icon href="#" icon={BsTwitter} />
                <Footer.Icon href="#" icon={BsInstagram} />
                <Footer.Icon href="#" icon={BsLinkedin} />
              </div>
            </div>
          </div>
          <Footer.Divider className="border-gray-500 my-0 lg:my-0" />
          <div className="w-full px-2 py-6 sm:flex sm:items-center sm:justify-between relative">
            <Footer.Copyright by="Wedsy Pvt. Ltd." href="#" year={2023} />
            <Link
              href={"#top"}
              className="absolute top-0 -translate-y-1/2 right-8 p-3 bg-[#902e27] rounded-full"
            >
              <BsChevronUp size={16} color={"white"} />
            </Link>
          </div>
        </div>
      </Footer>
    </>
  );
}
