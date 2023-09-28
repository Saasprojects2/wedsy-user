import { Footer } from "flowbite-react";
import { BsFacebook, BsLinkedin, BsInstagram, BsTwitter } from "react-icons/bs";
export default function FooterComponent() {
  return (
    <>
      <Footer container className="bg-[#f2eae7]">
        <div className="w-full">
          <div className="grid w-full grid-cols-2 gap-8 px-6 py-8 md:grid-cols-4">
            <div>
              <Footer.Title title="WEDDING IDEAS" className="text-[#b03138]" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Wedding Blog</Footer.Link>
                <Footer.Link href="#">Wedding Gallery</Footer.Link>
                <Footer.Link href="#">Real Wedding</Footer.Link>
                <Footer.Link href="#">Submit Wedding</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="START PLANNING" className="text-[#b03138]" />
              <Footer.LinkGroup col>
                <Footer.Link href="#">Venues</Footer.Link>
                <Footer.Link href="#">Shop</Footer.Link>
                <Footer.Link href="#">LGBTQ Wedding</Footer.Link>
                <Footer.Link href="#">Contact Us</Footer.Link>
              </Footer.LinkGroup>
            </div>
            <div>
              <Footer.Title title="QUICK LINKS" className="text-[#b03138]" />
              <Footer.LinkGroup col>
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
                className="text-[#b03138]"
              />
              <input className="w-full"/>
              <Footer.Title title="GET IN TOUCH" className="text-[#b03138]" />
              <Footer.LinkGroup col>
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
          <Footer.Divider />
          <div className="w-full px-4 py-6 sm:flex sm:items-center sm:justify-between">
            <Footer.Copyright by="Wedsy Pvt. Ltd." href="#" year={2023} />
          </div>
        </div>
      </Footer>
    </>
  );
}
