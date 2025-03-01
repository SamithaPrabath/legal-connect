import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { userReset } from "@redux/slices/user/user";
import { tempGetUserByProfileId } from "@temporaryActions/tempUserActions";
import { UserType } from "@type/User";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ClientProfile from "./ClientProfile";
import LawyerProfile from "./LawyerProfile";

const Profile = () => {
  const params = useParams();
  const dispatch = useAppDispatch();

  console.log(params);

  const profileId = params.profileID;

  const { data: profile } = useAppSelector((state) => state.user.user);

  useEffect(() => {
    if (!profileId) return;
    dispatch(tempGetUserByProfileId(profileId));

    return () => {
      dispatch(userReset());
    };
  }, [profileId]);

  if (!profile) return null;
  else if (profile.type === UserType.LAWYER)
    return <LawyerProfile userData={profile} />;
  else if (profile.type === UserType.CLIENT)
    return <ClientProfile userData={profile} />;
  else return null;
};

export default Profile;
