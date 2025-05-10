import { sendMessage, subscribeToChatMessages } from "@utils/chatService";
import LocalStorageHandler from "@utils/localStorageHandler";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Box, Paper, Typography, TextField, IconButton } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { IoCheckmarkDoneSharp, IoCheckmarkOutline } from "react-icons/io5";
import SubHeader from "@components/SubHeader";
import ImageCompo from "@components/ImageCompo";
import { flexCenter } from "@assets/style/boxStyles";
import MUIButton from "@components/MUIButton";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { profile_route } from "@utils/context-paths";
import { getUserByProfileId } from "@actions/userActions";
import { isBackendConnected } from "@utils/env-config";
import { tempGetUserByProfileId } from "@temporaryActions/tempUserActions";

interface Message {
  id: string;
  text: string;
  senderId: string;
  status: string;
}

const MessageBox: React.FC = () => {
  const params = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const destUserId = params.userId;
  const userId = new LocalStorageHandler().profileId;

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const { data: userData } = useAppSelector(state => state.user.user);

  useEffect(() => {
    if (!destUserId) return
    if (isBackendConnected)
        dispatch(getUserByProfileId(destUserId));
    else dispatch(tempGetUserByProfileId(destUserId));
  },[destUserId])

  useEffect(() => {
    if (!userId || !destUserId) return;

    const unsubscribe = subscribeToChatMessages(userId, destUserId, setMessages);
    return () => unsubscribe();
  }, [userId, destUserId]);

  const handleSend = async () => {
    if (!userId || !destUserId || !newMessage.trim()) return;
    await sendMessage(newMessage, userId, destUserId);
    setNewMessage("");
  };

  const viewReceiverProfile = () => {
    const profileId = userData?.id;
    if (!profileId) return;
    navigate(profile_route(profileId))
  }

  const fullName = !userData ? "N/A" : `${userData.basicInfo.firstName} ${userData.basicInfo.lastName}`

  return (
    <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <SubHeader height="fit-content" py="10px" display="flex" justifyContent="space-between" alignItems="center">
            <Box ml="20px" {...flexCenter} gap="20px">
                <ImageCompo base64String={userData?.basicInfo.image || null} width="50px" height="50px" />
                <Typography variant="h4">{fullName}</Typography>
            </Box>
            <Box px="30px">
            <MUIButton onClick={viewReceiverProfile} size="small" variant="outlined" color="secondary">View Profile</MUIButton>
            </Box>
        </SubHeader>
      <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
        {messages.map((msg) => (
          <Box key={msg.id} sx={{ display: "flex",  justifyContent: msg.senderId === userId ? "flex-end" : "flex-start", mb: 1 }}>
            <Paper sx={{ p: 2, maxWidth: "60%", display:"flex", flexWrap:"wrap", alignItem:"start", justifyContent:"end", gap:"20px", backgroundColor: msg.senderId === userId ? "#d0f0c0" : "#fff" }}>
              <Typography variant="body1" overflow="hidden" sx={{textWrap:"wrap"}}>{msg.text}</Typography>
              {msg.senderId === userId && (msg.status !== "seen" ? <IoCheckmarkOutline /> : <IoCheckmarkDoneSharp color="blue" />)}
            </Paper>
          </Box>
        ))}
      </Box>
      <Box sx={{ p: 2, display: "flex", backgroundColor: "white", borderTop: "1px solid #ddd" }}>
        <TextField
          fullWidth
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          variant="outlined"
          size="small"
        />
        <IconButton color="primary" sx={{ ml: 1 }} onClick={handleSend}>
          <SendIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default MessageBox;
