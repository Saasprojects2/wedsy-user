import UserSidebar from "@/components/layout/UserSidebar";
import { checkValidEmail } from "@/utils/email";
import { processMobileNumber } from "@/utils/phoneNumber";
import { Avatar, Button, TextInput } from "flowbite-react";
import { useEffect, useState } from "react";

export default function Account({ user }) {
  const [userInfo, setUserInfo] = useState(user);
  const [editProfile, setEditProfile] = useState(false);
  const [editAddress, setEditAddress] = useState(false);
  const [loading, setLoading] = useState(false);
  const fetchUser = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setUserInfo(response);
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const updateProfile = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        name: userInfo.name,
        phone: processMobileNumber(userInfo.phone),
        email: userInfo.email,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setEditProfile(false);
        fetchUser();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  const updateAddress = () => {
    setLoading(true);
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        address: userInfo.address,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        setLoading(false);
        setEditProfile(false);
        fetchUser();
      })
      .catch((error) => {
        console.error("There was a problem with the fetch operation:", error);
      });
  };
  useEffect(() => {
    fetchUser();
  }, []);
  return (
    <>
      <div className="flex flex-row">
        <UserSidebar display={"my-account"} />
        <div className="flex flex-col gap-3 p-12 flex-grow">
          <p className="text-2xl font-medium">Personal Information</p>
          <div className="flex flex-row gap-12 border-b border-black pb-4">
            <div className="h-64 w-64 bg-gray-500 rounded-full" />
            <div className="flex flex-col gap-3 flex-grow">
              <div>
                <p>Full Name:</p>
                <TextInput
                  value={userInfo.name}
                  onChange={(e) => {
                    setUserInfo({ ...userInfo, name: e.target.value });
                  }}
                  readOnly={!editProfile}
                  disabled={!editProfile}
                  className="w-full"
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p>Email:</p>
                  <TextInput
                    value={userInfo.email}
                    onChange={(e) => {
                      setUserInfo({ ...userInfo, email: e.target.value });
                    }}
                    type="email"
                    readOnly={!editProfile}
                    disabled={!editProfile}
                    className="w-full"
                  />
                </div>
                <div>
                  <p>Phone:</p>
                  <TextInput
                    value={userInfo.phone}
                    onChange={(e) => {
                      setUserInfo({
                        ...userInfo,
                        phone: e.target.value,
                      });
                    }}
                    type="text"
                    readOnly={!editProfile}
                    disabled={!editProfile}
                    className="w-full"
                  />
                </div>
              </div>
              <div>
                <Button
                  className="bg-rose-800 enabled:hover:bg-rose-900"
                  onClick={() =>
                    editProfile ? updateProfile() : setEditProfile(true)
                  }
                  disabled={
                    loading ||
                    (editProfile
                      ? !userInfo.name ||
                        !checkValidEmail(userInfo.email) ||
                        !processMobileNumber(userInfo.phone)
                      : false)
                  }
                >
                  {editProfile ? "Update Profile" : "Edit Profile"}
                </Button>
              </div>
            </div>
          </div>
          <p className="text-2xl font-medium">Home Address</p>
          <div className="grid grid-cols-2 gap-12 gap-y-4">
            <div>
              <p>Apartment/House number:</p>
              <TextInput
                value={userInfo.address?.apartment}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    address: { ...userInfo.address, apartment: e.target.value },
                  });
                }}
                readOnly={!editAddress}
                disabled={!editAddress}
                className="w-full"
              />
            </div>
            <div>
              <p>Street/Locality:</p>
              <TextInput
                value={userInfo.address?.street}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    address: { ...userInfo.address, street: e.target.value },
                  });
                }}
                readOnly={!editAddress}
                disabled={!editAddress}
                className="w-full"
              />
            </div>
            <div>
              <p>City:</p>
              <TextInput
                value={userInfo.address?.city}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    address: { ...userInfo.address, city: e.target.value },
                  });
                }}
                readOnly={!editAddress}
                disabled={!editAddress}
                className="w-full"
              />
            </div>
            <div>
              <p>State:</p>
              <TextInput
                value={userInfo.address?.state}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    address: { ...userInfo.address, state: e.target.value },
                  });
                }}
                readOnly={!editAddress}
                disabled={!editAddress}
                className="w-full"
              />
            </div>
            <div>
              <p>Landmark:</p>
              <TextInput
                value={userInfo.address?.landmark}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    address: { ...userInfo.address, landmark: e.target.value },
                  });
                }}
                readOnly={!editAddress}
                disabled={!editAddress}
                className="w-full"
              />
            </div>
            <div>
              <p>PinCode:</p>
              <TextInput
                value={userInfo.address?.pinCode}
                onChange={(e) => {
                  setUserInfo({
                    ...userInfo,
                    address: { ...userInfo.address, pinCode: e.target.value },
                  });
                }}
                readOnly={!editAddress}
                disabled={!editAddress}
                className="w-full"
              />
            </div>
            <div>
              <Button
                className="bg-rose-800 enabled:hover:bg-rose-900"
                onClick={() =>
                  editAddress ? updateAddress() : setEditAddress(true)
                }
                disabled={loading}
              >
                {editAddress ? "Update Address" : "Edit Address"}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
