import fetchApiWithToken from "@/util/fetchApiWithToken";
import { faEye, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import isEmail from "validator/lib/isEmail";

function Account() {
  const router = useRouter();
  const {
    data: session,
    status,
    update,
  } = useSession({
    required: true,
    onUnauthenticated() {
      router.push("/");
    },
  });
  const [loading, setLoading] = useState<{
    avatarLoading: boolean;
    userNameLoading: boolean;
    emailLoading: boolean;
    passwordLoading: boolean;
  }>({
    avatarLoading: false,
    userNameLoading: false,
    emailLoading: false,
    passwordLoading: false,
  });
  const [resStatus, setResStatus] = useState<{
    avatarStatus: Array<string>;
    userNameStatus: Array<string>;
    emailStatus: Array<string>;
    passwordStatus: Array<string>;
  }>({
    avatarStatus: [],
    userNameStatus: [],
    emailStatus: [],
    passwordStatus: [],
  });
  const [profile, setProfile] = useState<any>();
  const [newUserName, setNewUserName] = useState<string>("");
  const [newEmail, setNewEmail] = useState<string>("");
  const [currentPassword, setCurrentPassword] = useState<string>("");
  const [newPassword, setNewPassword] = useState<string>("");
  const [comfirmPassword, setComfirmPassword] = useState<string>("");
  const [avatarFile, setAvatarFile] = useState<any>();

  const onChangeAvatar = (e: any) => {
    if (e.target.files[0]) {
      setProfile({
        ...profile,
        avatar: URL.createObjectURL(e.target.files[0]),
      });
      setAvatarFile(e.target.files[0]);
    }
  };

  const onUpdateAvatar = async () => {
    if (avatarFile) {
      setLoading({ ...loading, avatarLoading: true });
      let user: any = session?.user;
      try {
        const { results, status, newAT } = await fetchApiWithToken(
          ["account/profile/avatar/update"],
          "post",
          user.accessToken,
          user.refeshToken,
          { avatarFile },
          "multipart/form-data"
        );
        authHandle(status, newAT, results);
        if (results) {
          let [data] = results;
          setResStatus({ ...resStatus, avatarStatus: [data.message] });
          if (data.payload.newAvatarUrl) {
            update({ newAvatarUrl: data.payload.newAvatarUrl });
          }
        }
      } catch (error: any) {
        setResStatus({
          ...resStatus,
          avatarStatus: error.response.data.message,
        });
      }
      setLoading({ ...loading, avatarLoading: false });
    } else {
      setResStatus({
        ...resStatus,
        avatarStatus: ["Please select your Avatar!"],
      });
    }
  };

  const onUpdateUserName = async () => {
    if (newUserName && newUserName.length >= 6) {
      setLoading({ ...loading, userNameLoading: true });
      let user: any = session?.user;
      try {
        const { results, status, newAT } = await fetchApiWithToken(
          ["account/profile/username/update"],
          "post",
          user.accessToken,
          user.refeshToken,
          { newUserName }
        );
        authHandle(status, newAT, results);
        if (results) {
          let [data] = results;
          setResStatus({ ...resStatus, userNameStatus: [data.message] });
          if (data.payload) {
            //update session
            update({ newUserName: data.payload.newUserName });
          }
        }
      } catch (error: any) {
        setResStatus({
          ...resStatus,
          userNameStatus: error.response.data.message,
        });
      }
      setLoading({ ...loading, userNameLoading: false });
    } else {
      setResStatus({
        ...resStatus,
        userNameStatus: ["UserName must contain less 6 character!"],
      });
    }
  };

  const onUpdateEmail = async () => {
    if (isEmail(newEmail)) {
      setLoading({ ...loading, emailLoading: true });
      let user: any = session?.user;
      try {
        const { results, status, newAT } = await fetchApiWithToken(
          ["account/profile/email/update"],
          "post",
          user.accessToken,
          user.refeshToken,
          { newEmail }
        );
        authHandle(status, newAT, results);
        if (results) {
          let [data] = results;
          setResStatus({ ...resStatus, emailStatus: [data.message] });
          if (data.payload) {
            //update session
            update({ newEmail: data.payload.newUserName });
          }
        }
      } catch (error: any) {
        setResStatus({
          ...resStatus,
          userNameStatus: error.response.data.message,
        });
      }
      setLoading({ ...loading, userNameLoading: false });
    } else {
      setResStatus({
        ...resStatus,
        emailStatus: ["Email unavailable"],
      });
    }
  };

  const onUpdatePassword = async () => {
    if (
      newPassword.length >= 8 &&
      currentPassword.length >= 8 &&
      newPassword === comfirmPassword
    ) {
      setLoading({ ...loading, passwordLoading: true });
      let user: any = session?.user;
      try {
        const { results, status, newAT } = await fetchApiWithToken(
          ["account/profile/password/update"],
          "post",
          user.accessToken,
          user.refeshToken,
          { newPassword, comfirmPassword, currentPassword }
        );
        authHandle(status, newAT, results);
        if (results) {
          let [data] = results;
          setResStatus({ ...resStatus, passwordStatus: [data.message] });
        }
      } catch (error: any) {
        setResStatus({
          ...resStatus,
          passwordStatus: error.response.data.message,
        });
      }
      setLoading({ ...loading, passwordLoading: false });
      setComfirmPassword("");
      setCurrentPassword("");
      setNewPassword("");
    } else {
      setResStatus({
        ...resStatus,
        passwordStatus: [
          "Password unavailable! Please try again!",
          "*Password must contain less 8 character",
        ],
      });
    }
  };

  const authHandle = (status: any, newAT: any, results: any) => {
    if (status === "unauthenticated" || !results) {
      signOut({ callbackUrl: "/" });
    }
    if (newAT) {
      update({ newAT: newAT });
    }
  };

  const togglePassword = (type: "nP" | "cfP", e: any) => {
    let input: any = document.getElementById(type);
    if (input.type === "password") {
      input.type = "text";
    } else {
      input.type = "password";
    }
  };

  useEffect(() => {
    (async () => {
      let user: any = session?.user;
      const { results, status, newAT } = await fetchApiWithToken(
        ["account/profile"],
        "get",
        user.accessToken,
        user.refeshToken
      );
      if (status === "unauthenticated" || !results) {
        signOut({ callbackUrl: "/" });
      }
      if (newAT) {
        update({ newAT: newAT });
      }
      if (results) {
        const [userProfile] = results;
        setProfile(userProfile.payload);
      }
    })();
  }, []);

  return (
    profile && (
      <div>
        <section className="relative border-b border-black/10 pb-7">
          <h2 className="font-semibold mb-5">Change Avatar</h2>
          <div className="flex">
            {loading?.avatarLoading && (
              <div className="absolute w-full h-full bg-white/70 flex justify-center items-center text-red-500 text-2xl">
                <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
              </div>
            )}
            <div className="w-48 h-48 mr-5 overflow-hidden rounded border-2 border-black/10">
              <img
                src={profile.avatar}
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <h3 className="text-lg mb-2">Only for .jpg .png file</h3>
              <input
                type="file"
                name="avatar_input"
                className="hidden"
                id="image_input"
                accept=".jpg, .png"
                onChange={onChangeAvatar}
              />
              <div>
                <label
                  htmlFor="image_input"
                  className=" text-sm py-1 px-2 rounded-sm border border-black/30 duration-150 hover:cursor-pointer hover:bg-black hover:text-white "
                >
                  Choose file
                </label>
              </div>
              <button
                className="bg-mainColor rounded-full text-sm mt-4 font-semibold duration-150 py-2 px-6 text-white hover:bg-black"
                onClick={onUpdateAvatar}
              >
                Upload
              </button>
              <p className="text-red-500 mt-3">{resStatus.avatarStatus}</p>
            </div>
          </div>
        </section>

        <section className="relative py-7 border-b border-black/10">
          {loading?.userNameLoading && (
            <div className="absolute w-full h-full bg-white/70 flex justify-center items-center text-red-500 text-2xl">
              <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
            </div>
          )}
          <h2 className="font-semibold">Change Your Display Name</h2>
          {resStatus.userNameStatus.map((item, index) => (
            <p key={index} className="text-red-500 mt-3">
              {item}
            </p>
          ))}
          <div className="flex items-center my-5">
            <label className="text-black/70 w-44 mr-2">
              Current Display Name
            </label>
            <p className="font-semibold flex-1">{profile.userName}</p>
          </div>
          <div className="flex items-center mt-5 mb-3">
            <label className="text-black/70 w-44 mr-2">New Display Name</label>
            <input
              type="text"
              className="border border-black/20 rounded p-2 outline-none flex-1 focus:border-mainColor duration-150"
              onChange={(e: any) => setNewUserName(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="bg-mainColor rounded-full text-sm mt-4 font-semibold duration-150 py-2 px-5 text-white hover:bg-black"
              onClick={onUpdateUserName}
            >
              Submit
            </button>
          </div>
        </section>

        <section className="relative py-7 border-b border-black/10">
          {loading?.emailLoading && (
            <div className="absolute w-full h-full bg-white/70 flex justify-center items-center text-red-500 text-2xl">
              <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
            </div>
          )}
          <h2 className="font-semibold">Change Your Email Address</h2>
          <p className="text-red-500 mt-3">{resStatus.emailStatus}</p>
          <div className="flex items-center my-5">
            <label className="text-black/70 w-44 mr-2">Current Email</label>
            <p className="font-semibold flex-1">{profile.email}</p>
          </div>
          <div className="flex items-center mt-5 mb-3">
            <label className="text-black/70 w-44 mr-2">New Email Address</label>
            <input
              type="text"
              className="border border-black/20 rounded p-2 outline-none flex-1 focus:border-mainColor duration-150"
              onChange={(e: any) => setNewEmail(e.target.value)}
            />
          </div>
          <div className="text-center">
            <button
              className="bg-mainColor rounded-full text-sm mt-4 font-semibold duration-150 py-2 px-5 text-white hover:bg-black"
              onClick={onUpdateEmail}
            >
              Submit
            </button>
          </div>
        </section>

        <section className="relative py-7">
          {loading?.passwordLoading && (
            <div className="absolute w-full h-full bg-white/70 flex justify-center items-center text-red-500 text-2xl">
              <FontAwesomeIcon icon={faSpinner} spin></FontAwesomeIcon>
            </div>
          )}
          <h2 className="font-semibold">Change Your Password</h2>
          <p className="text-red-500 mt-3">{resStatus.passwordStatus}</p>
          <div className="flex items-center mt-5 mb-3">
            <label className="text-black/70 w-44 mr-2">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              className="border border-black/20 rounded p-2 outline-none flex-1 focus:border-mainColor duration-150"
              onChange={(e: any) => setCurrentPassword(e.target.value)}
            />
          </div>
          <div className="flex items-center mt-5 mb-3">
            <label className="text-black/70 w-44 mr-2">New Password</label>
            <input
              type="password"
              id="nP"
              value={newPassword}
              className="border border-black/20 rounded p-2 outline-none flex-1 focus:border-mainColor duration-150 mr-3"
              onChange={(e: any) => setNewPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faEye}
              className="text-black/40 hover:cursor-pointer hover:text-black duration-150"
              onClick={(e) => togglePassword("nP", e)}
            ></FontAwesomeIcon>
          </div>
          <div className="flex items-center mt-5 mb-3">
            <label className="text-black/70 w-44 mr-2">Comfirm Password</label>
            <input
              type="password"
              id="cfP"
              value={comfirmPassword}
              className="border border-black/20 rounded p-2 outline-none flex-1 focus:border-mainColor duration-150 mr-3"
              onChange={(e: any) => setComfirmPassword(e.target.value)}
            />
            <FontAwesomeIcon
              icon={faEye}
              className="text-black/40 hover:cursor-pointer hover:text-black duration-150"
              onClick={(e) => togglePassword("cfP", e)}
            ></FontAwesomeIcon>
          </div>
          <div className="text-center">
            <button
              className="bg-mainColor rounded-full text-sm mt-4 font-semibold duration-150 py-2 px-5 text-white hover:bg-black"
              onClick={onUpdatePassword}
            >
              Submit
            </button>
          </div>
        </section>
      </div>
    )
  );
}

export default Account;
