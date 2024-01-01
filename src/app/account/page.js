"use client"
import { RiImageAddLine } from "react-icons/ri";
import {useState} from "react"
const AccountPage = () => {
  const [image, setImage] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState("");
  const [email, setEmail] = useState("");
  const [dob, setDob] = useState("");
  const [phone, setPhone] = useState("");
  const [about, setAbout] = useState("");
  const [errors, setErrors] = useState({});

  const API_URL = process.env.NEXT_API_URL
  const handleSubmit = async (e) => {
    e.preventDefault();

    const fieldErrors = {};
    if (!firstName) {
      fieldErrors.firstName = "Firstname is required";
    }
    if (!lastName) {
      fieldErrors.lastName = "Lastname is required";
    }
    if (!gender) {
      fieldErrors.gender = "Gender is required";
    }
    if (!email) {
      fieldErrors.email = "Email is required";
    }
    if (!dob) {
      fieldErrors.dob = "Date of birth is required";
    }else{
      const currentDate = new Date();
      const enteredDate = new Date(dob);

      if (enteredDate >= currentDate) {
        fieldErrors.dob = "Date of birth must be in the past";
      }
    }
    if (!phone) {
      fieldErrors.phone = "Phone number is required";
    }
    if (!about) {
      fieldErrors.about = "About you is required";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    let data = await fetch(`${process.env.NEXT_PUBLIC_BASE_API_URL}/api/products`, {
      method: "POST",
      body: JSON.stringify({
        firstname: firstName,
        lastname: lastName,
        gender,
        email,
        dob: dob.split("T")[0],
        phone,
        about,
        image
      }),
    });
    data = await data.json();
    if (data.success) {
      alert("New user added");
      setFirstName("");
      setLastName("");
      setGender("");
      setEmail("");
      setDob("");
      setPhone("");
      setAbout("");
    }
  };

  const currentDate = new Date().toISOString().split("T")[0]
  return (
    <div className="mt-8">
      <p className="text-2xl font-semibold mb-4">Account information</p>
      <form onSubmit={handleSubmit}>
        {/* Image  */}
        <div className="flex gap-10 pt-4">
          <div className="w-[128px] h-[128px] border ab rounded-full flex bg-[#314044] flex-col pt-9 justify-center items-center">
            <RiImageAddLine className="h-[60px] w-[60px] text-white " />
            <p className="text-white font-normal text-sm">Change image</p>
            <input
              type="image"
              onChange={(e)=>setImage(e.target.value)}
              alt="Change Image"
              className=" opacity-0 cursor-pointer text-xs w-[128px] h-[128px] border border-gray-300 hover:border-blue-100 hover:border-[3px] rounded-full"
            />
          </div>
          {/* Inputs */}
          <div className="flex flex-col">
            <div className="flex flex-col">
              <label
                htmlFor="firstname"
                className="text-sm pb-2 text-gray-700 font-semibold"
              >
                Firstname
              </label>
              <input
                type="text"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                id="firstname"
                className="px-3 py-3 focus:border-blue-100 mb-1 rounded-2xl border w-[700px]"
              />
              {errors.firstName && (
                <p className="text-red-500 text-xs">{errors.firstName}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="lastname"
                className="text-sm pb-2 text-gray-700 font-semibold"
              >
                Lastname
              </label>
              <input
                type="text"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
                id="lastname"
                className="px-3 py-3 focus:border-blue-100 mb-1 rounded-2xl border w-[700px]"
              />
              {errors.lastName && (
                <p className="text-red-500 text-xs">{errors.lastName}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="gender"
                className="text-sm pb-2 text-gray-700 font-semibold"
              >
                Gender
              </label>
              <select
                name="gender"
                id="gender"
                onChange={(e) => setGender(e.target.value)}
                value={gender}
                className="px-2  py-3 focus:border-blue-100 mb-1 rounded-2xl border w-[700px] text-sm text-gray-700 "
              >
                <option>Select</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-xs">{errors.gender}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-sm pb-2 text-gray-700 font-semibold"
              >
                Email
              </label>
              <input
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                id="email"
                className="px-3 py-3 focus:border-blue-100 mb-1 rounded-2xl border w-[700px]"
              />
              {errors.email && (
                <p className="text-red-500 text-xs">{errors.email}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="dob"
                className="text-sm pb-2 text-gray-700 font-semibold"
              >
                Date of birth
              </label>
              <input
                type="date"
                id="dob"
                max={currentDate}
                onChange={(e) => setDob(e.target.value)}
                value={dob}
                className="px-3 py-3 focus:border-blue-100 mb-1 rounded-2xl border w-[700px] text-sm text-gray-700"
              />
              {errors.dob && (
                <p className="text-red-500 text-xs">{errors.dob}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="phone"
                className="text-sm pb-2 text-gray-700 font-semibold"
              >
                Phone number
              </label>
              <input
                type="number"
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                id="phone"
                className="px-3 py-3 focus:border-blue-100 focus:border-3 mb-1 rounded-2xl border w-[700px]"
              />
              {errors.phone && (
                <p className="text-red-500 text-xs">{errors.phone}</p>
              )}
            </div>
            <div className="flex flex-col">
              <label
                htmlFor="about"
                className="text-sm pb-2 text-gray-700 font-semibold"
              >
                About you
              </label>
              <textarea
                name="about"
                onChange={(e) => setAbout(e.target.value)}
                value={about}
                id="about"
                cols="10"
                rows="3"
                className="rounded-2xl border px-3 py-3"
              />
              {errors.about && (
                <p className="text-red-500 text-xs">{errors.about}</p>
              )}
            </div>
            <button
              type="submit"
              className="border w-36 h-12 rounded-full mt-2 text-white font-semibold text-base bg-[#4338CA]"
            >
              Update info
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AccountPage;
