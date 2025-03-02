import { userListByIdsAction, userSearchAction } from "@actions/userActions";
import { border, flexCenter } from "@assets/style/boxStyles";
import ImageCompo from "@components/ImageCompo";
import MUITextField from "@components/MUITextField";
import {
  Box,
  lighten,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import { userSuccess } from "@redux/slices/user/user";
import { tempUserListAction } from "@temporaryActions/tempUserActions";
import { UserInfoResponse } from "@type/User";
import { getAssociatedUserIds } from "@utils/chatService";
import { message_route, message_with_user_rotue } from "@utils/context-paths";
import { isBackendConnected } from "@utils/env-config";
import LocalStorageHandler from "@utils/localStorageHandler";
import { useEffect, useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function Messages() {
  const [receiverIds, setReceiverIds] = useState<string[]>([]);

  const { pathname } = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: contacts } = useAppSelector((state) => state.user.list);

  const userId = new LocalStorageHandler().profileId;

  useEffect(() => {
    if (!userId) return;
    getAssociatedUserIds(userId).then(setReceiverIds);
  }, [userId]);

  useEffect(() => {
    if (isBackendConnected) dispatch(userListByIdsAction(receiverIds));
    else dispatch(tempUserListAction());
  }, [receiverIds]);

  const handleContactClick = (contact: UserInfoResponse) => {
    dispatch(userSuccess(contact));
    navigate(message_with_user_rotue(contact.id));
  };

  const onChange = (value: string) => {
    dispatch(userSearchAction(value));
  };

  return (
    <Box
      p="30px"
      height="calc(100dvh - 130px)"
      sx={{ display: "flex", backgroundColor: "#f5f5f5" }}
    >
      {/* Sidebar */}
      <Box {...border} display="flex" width="100%">
        <Box
          sx={{
            width: "250px",
            backgroundColor: "white",
            p: 2,
            borderRight: "1px solid #ddd",
          }}
        >
          <Typography variant="h2" gutterBottom textAlign="center" my="20px">
            Messages
          </Typography>
          <MUITextField
            fullWidth
            placeholder="Search Box"
            size="small"
            sx={{ mb: 2 }}
            onChange={(e) => onChange(e.target.value)}
          />
          <List>
            {contacts?.map((contact) => (
              <ListItem
                sx={{
                  cursor: "pointer",
                  ":hover": {
                    bgcolor: lighten(useTheme().palette.text.secondary, 0.9),
                  },
                }}
                component="div"
                key={contact.id}
                onClick={() => {
                  handleContactClick(contact);
                }}
              >
                <ListItemAvatar>
                  <ImageCompo
                    width="40px"
                    height="40px"
                    base64String={contact.basicInfo.image}
                  />
                </ListItemAvatar>
                <ListItemText
                  primary={`${contact.basicInfo.firstName} ${contact.basicInfo.lastName}`}
                  secondary={contact.basicInfo.occupation}
                />
              </ListItem>
            ))}
          </List>
        </Box>
        {pathname === message_route && (
          <Box {...flexCenter} height="100%" width="calc(100% - 280px)">
            <Typography
              variant="h4"
              sx={{ color: lighten(useTheme().palette.text.secondary, 0.4) }}
            >
              Select a chat to view here
            </Typography>
          </Box>
        )}
        <Outlet />
      </Box>
    </Box>
  );
}
