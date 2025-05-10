import { getUserByProfileId } from "@actions/userActions";
import { flexCenter } from "@assets/style/boxStyles";
import { Box } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import LocalStorageHandler from "@utils/localStorageHandler";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";

declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

const Meets: React.FC = () => {
  const [displayName, setDisplayName] = useState<string>("");
  const containerRef = useRef<HTMLDivElement>(null);
  const localStorageHandler = new LocalStorageHandler();
  const params = useParams();
  const roomId = params.roomId;


  const { data: userData } = useAppSelector((state) => state.user.user);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!localStorageHandler.profileId) return;
    dispatch(getUserByProfileId(localStorageHandler.profileId));
  }, [localStorageHandler.profileId]);

  useEffect(() => {
    if (!userData) return;
    const firstName = userData.basicInfo.firstName;
    const lastName = userData.basicInfo.lastName;
    setDisplayName(`${firstName} ${lastName}`);
  }, [userData]);

  useEffect(() => {
    if (!window.JitsiMeetExternalAPI || !roomId) {
      console.error("Jitsi Meet API script not loaded");
      return;
    }

    const domain = "meet.jit.si";
    const options = {
      roomName: roomId,
      width: "100%",
      height: "100%",
      parentNode: containerRef.current,
      userInfo: {
        displayName: displayName || "Guest",
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);
    return () => api.dispose();
  }, [roomId, displayName]);

  return (
    <Box
      {...flexCenter}
      position="fixed"
      top="0"
      left="0"
      width="100dvw"
      height="100dvh"
      zIndex={10}
    >
      <div ref={containerRef} style={{ width: "100%", height: "100%" }} />
    </Box>
  );
};

export default Meets;
