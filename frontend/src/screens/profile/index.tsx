import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { userReset } from "@redux/slices/user/user";
import { tempGetUserByProfileId } from "@temporaryActions/tempUserActions";
import { UserType } from "@type/User";
import { profile_about_route, profile_route } from "@utils/context-paths";
import { useEffect } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import ClientProfile from "./ClientProfile";
import LawyerProfile from "./LawyerProfile";

const Profile = () => {
  const params = useParams();
  const dispatch = useAppDispatch();
  const { pathname } = useLocation();
  const navigate = useNavigate();

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

  useEffect(() => {
    if (!profileId) return;
    if (pathname === profile_route(profileId) && profile?.type === UserType.LAWYER)
      navigate(profile_about_route(profileId));
  },[profileId]);

  if (!profile) return null;
  else if (profile.type === UserType.LAWYER)
    return <LawyerProfile userData={profile} />;
  else if (profile.type === UserType.CLIENT)
    return <ClientProfile userData={profile} />;
  else return null;
};

export default Profile;
