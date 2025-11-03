import { useUserStore } from "@/store/user";
import { useMessageDmManageStore } from "@/store/messageDmManage";
import { useMessageHeaderStore } from "@/store/messageHeader";
import { useNavigationWithProgress } from "@/hooks/useNavigationWithProgress";
import { useAlertStore } from "@/store/alert";

export type ChatUser = {
  userId: string;
  thumbnail: string;
};

export function useMoveChatRoom() {
  const { userId: currentUserId } = useUserStore();
  const { setValues } = useMessageDmManageStore();
  const { setValues: setMessageHeader } = useMessageHeaderStore();
  const navigate = useNavigationWithProgress();
  const { error } = useAlertStore();

  const moveChatRoom = (user: ChatUser) => {
    if(currentUserId === user.userId){
        error("자기 자신과는 채팅할 수 없습니다.")
        return;
    };
    const chatRoomId = [currentUserId, user.userId].sort().join(":");
    navigate(`/message/${chatRoomId}`);
    setMessageHeader({
      chatProfile: user.thumbnail,
      chatRoomName: user.userId,
      memberCount: 2,
    });
    setValues({
      chatProfile: user.thumbnail,
      chatRoomId: chatRoomId,
      chatRoomName: user.userId,
      isOpen: true,
    });
  };

  return { moveChatRoom };
}