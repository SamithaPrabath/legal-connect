import {
    addDoc,
    collection,
    doc,
    getDocs,
    onSnapshot,
    orderBy,
    query,
    setDoc,
    updateDoc,
    where
} from "firebase/firestore";
import { db } from "./firebaseConfig";
  
  const generateChatId = (user1: string, user2: string): string => {
    return user1 < user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
  };
  
  /**
   * Subscribe to chat messages and mark received messages as "seen"
   */
  export const subscribeToChatMessages = (
    user1: string,
    user2: string,
    callback: (messages: any[]) => void
  ) => {
    const chatId = generateChatId(user1, user2);
    const messagesRef = collection(db, `chats/${chatId}/messages`);
    const q = query(messagesRef, orderBy("createdAt"));
  
    return onSnapshot(q, async (snapshot) => {
      const messages = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      callback(messages);
  
      // Update unread messages to "seen"
      const unseenMessages = snapshot.docs.filter(
        (doc) => doc.data().senderId !== user1 && doc.data().status === "sent"
      );
  
      unseenMessages.forEach(async (messageDoc) => {
        const messageRef = doc(db, `chats/${chatId}/messages`, messageDoc.id);
        await updateDoc(messageRef, { status: "seen" });
      });
    });
  };
  

  /**
   * Send a message with "sent" status
   */
  export const sendMessage = async (
    text: string,
    senderId: string,
    receiverId: string
  ) => {
    const chatId = generateChatId(senderId, receiverId);
    const chatRef = doc(db, "chats", chatId);
    const messagesRef = collection(chatRef, "messages");
  
    await setDoc(chatRef, { user1Id: senderId, user2Id: receiverId }, { merge: true });
  
    await addDoc(messagesRef, {
      senderId,
      text,
      createdAt: new Date().toISOString(),
      status: "sent", // Initially marked as "sent"
    });
  };

  export const getUnseenMessageCount = async (
    userId: string,
    otherUserId: string
  ): Promise<number> => {
    const chatId = generateChatId(userId, otherUserId);
    const messagesRef = collection(db, `chats/${chatId}/messages`);
  
    const q = query(messagesRef, where("senderId", "==", otherUserId), where("seen", "==", false));
    const snapshot = await getDocs(q);
    return snapshot.size; // Count of unseen messages
  };


  export const subscribeToUsersWithUnseenMessages = (
    userId: string,
    callback: (count: number) => void
  ) => {
    const chatsRef = collection(db, "chats");
  
    // Find all chat rooms where the user is a participant
    const q1 = query(chatsRef, where("user1Id", "==", userId));
    const q2 = query(chatsRef, where("user2Id", "==", userId));
  
    // Listen to changes in the user's chat rooms
    const unsubscribeChats1 = onSnapshot(q1, (snapshot1) => {
      const unsubscribeChats2 = onSnapshot(q2, (snapshot2) => {
        const chatDocs = [...snapshot1.docs, ...snapshot2.docs];
  
        let unseenUsers = new Set<string>();
  
        chatDocs.forEach((chatDoc) => {
          const chatId = chatDoc.id;
          const messagesRef = collection(db, `chats/${chatId}/messages`);
  
          const qMessages = query(messagesRef, where("seen", "==", false), where("senderId", "!=", userId));
  
          // Subscribe to unseen messages in each chat
          const unsubscribeMessages = onSnapshot(qMessages, (messagesSnapshot) => {
            messagesSnapshot.docs.forEach((doc) => {
              unseenUsers.add(doc.data().senderId); // Add sender ID to the set
            });
  
            callback(unseenUsers.size); // Update count in real-time
          });
  
          // Return message listener for cleanup
          return unsubscribeMessages;
        });
      });
  
      // Return second chat listener for cleanup
      return unsubscribeChats2;
    });
  
    // Return first chat listener for cleanup
    return unsubscribeChats1;
  };
  

 

  export const getAssociatedUserIds = async (senderId: string) => {
    const chatsRef = collection(db, "chats");
  
    // Query chats where the sender is user1 or user2
    const q1 = query(chatsRef, where("user1Id", "==", senderId));
    const q2 = query(chatsRef, where("user2Id", "==", senderId));
  
    const snapshot1 = await getDocs(q1);
    const snapshot2 = await getDocs(q2);
  
    // Extract unique user IDs from chats
    const userIds = new Set<string>();
  
    snapshot1.forEach((doc) => {
      const data = doc.data();
      userIds.add(data.user2Id); // Add the other user
    });
  
    snapshot2.forEach((doc) => {
      const data = doc.data();
      userIds.add(data.user1Id); // Add the other user
    });
  
    return Array.from(userIds); // Convert Set to array
  };