import Image from "next/image";
import Link from "next/link";
const Navbar = () => {
  return (
    <>
      <div className="flex justify-between items-center align-center mb-8">
        <div>
          <Link href="/">
            <Image src="/logo.svg" height={60} width={60} alt="logo" />
          </Link>
        </div>
        <div className="flex justify-between gap-2">
          <div>
            <Link
              href="/account"
              className=" px-4 py-2 w-36 h-12 rounded-full  text-white font-semibold text-base bg-[#4338CA]"
            >
              Add Users
            </Link>
          </div>
          <div>
            <Link
              href="/users"
              className=" w-36 h-12 px-4 py-2 rounded-full text-white font-semibold text-base bg-[#4338CA]"
            >
              All users
            </Link>
          </div>
        </div>
      </div>
      <hr />
    </>
  );
};

export default Navbar;
