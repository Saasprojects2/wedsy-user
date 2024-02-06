import { Footer } from "flowbite-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsGoogle } from "react-icons/bs";

export default function FooterComponent() {
  const [displayFooter, setDisplayFooter] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (router?.pathname === "/weddings-made-easy") {
      setDisplayFooter(false);
    }
  }, [router?.pathname]);
  return (
    displayFooter && (
      <>
        <Footer container className="bg-[#840032] text-white p-0 rounded-none">
          <div className="w-full">
            <div className="grid w-full grid-cols-1 gap-8 px-6 py-8 md:grid-cols-3">
              <div className="md:col-span-2">
                <Footer.LinkGroup
                  col
                  className="text-white uppercase font-medium space-y-2 md:space-y-6"
                >
                  <Footer.Link href="/terms-and-conditions">
                    TERMS & CONDITIONS
                  </Footer.Link>
                  <Footer.Link href="/privacy-policy">
                    PRIVACY POLICY
                  </Footer.Link>
                  <Footer.Link href="tel:+916364849760">
                    CALL US AT +91 6364849760
                  </Footer.Link>
                </Footer.LinkGroup>
              </div>
              <div>
                <Footer.Title
                  title="GET IN TOUCH"
                  className="text-white mb-2"
                />
                <Footer.LinkGroup col className="space-y-1 text-white">
                  <Footer.Link href="mailto:hello@wedsy.in">
                    hello@wedsy.in
                  </Footer.Link>
                  <Footer.Link href="#">
                    #14, HM Geneva House, Cunningham Road Bangalore
                  </Footer.Link>
                </Footer.LinkGroup>
                <div className="md:mt-4 flex space-x-6 sm:mt-0 text-white">
                  <Footer.Icon
                    href="https://www.facebook.com/wedsy.in?mibextid=LQQJ4d"
                    icon={BsFacebook}
                    className="text-white"
                  />
                  <Footer.Icon
                    href="https://x.com/wedsyindia?s=11&t=cw__PWAfpNh_XaLeRkSHcg"
                    icon={BsTwitter}
                    className="text-white"
                  />
                  <Footer.Icon
                    href="https://www.instagram.com/wedsy.in?igsh=MTV3bWszMjVrM2pzbQ=="
                    icon={BsInstagram}
                    className="text-white"
                  />
                  <Footer.Icon
                    href="https://g.co/kgs/F3kbQei"
                    icon={BsGoogle}
                    className="text-white"
                  />
                </div>
              </div>
            </div>

            <div className="bg-black text-white text-sm px-8 py-3 w-full">
              Copyright &copy; WEDSY INDIA PRIVATE LIMITED. All rights reserved.
            </div>
          </div>
        </Footer>
      </>
    )
  );
}
