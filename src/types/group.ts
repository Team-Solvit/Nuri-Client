// Group 관련 타입들
export interface Group {
  groupId: string;
  name: string;
  description: string;
  area: string;
  maxParticipation: number;
  currentParticipation: number;
  profile?: string;
  banner?: string;
  latitude: number;
  longitude: number;
  thirdPartyName: string;
  createdAt: string;
}

export interface GroupMember {
  userId: string;
  name: string;
  email: string;
  joinedAt: string;
}

export interface GroupSchedule {
  scheduleId: string;
  groupId: string;
  groupName: string;
  title: string;
  description?: string;
  location: string;
  scheduledAt: string;
  durationMinutes?: number;
  file?: string;
  createdAt: string;
}

export interface GroupScheduleRecord {
  recordId: string;
  scheduleId: string;
  scheduleTitle: string;
  writerUserId: string;
  writerName: string;
  title: string;
  content: string;
  imageUrls?: string[];
  createdAt: string;
}

export interface GroupParticipationRequest {
  requestId: string;
  requesterId?: string;
  requesterName?: string;
  groupId?: string;
  groupName?: string;
  requestMessage?: string;
  requestDate: string;
}

// Input 타입들
export interface GroupCreateInput {
  name: string;
  banner?: string;
  description: string;
  profile?: string;
  introduce: string;
  position: PositionInput;
  maxParticipation: number;
}

export interface GroupUpdateInput {
  groupId: string;
  name: string;
  banner?: string;
  description: string;
  profile?: string;
  introduce: string;
  position: PositionInput;
  maxParticipation: number;
}

export interface PositionInput {
  area: string;
  latitude: number;
  longitude: number;
}

export interface GroupJoinInput {
  groupId: string;
  requestMessage?: string;
}

export interface GroupScheduleCreateInput {
  groupId: string;
  title: string;
  description?: string;
  location: string;
  scheduledAt: string;
  durationMinutes?: number;
  file?: string;
}

export interface GroupScheduleRecordCreateInput {
  scheduleId: string;
  fileUrl: string;
}

// 응답 타입들
export interface GetGroupsByAreaResponse {
  getGroupsByArea: Group[];
}

export interface GetGroupInfoResponse {
  getGroupInfo: Group;
}

export interface GetGroupMembersResponse {
  getGroupMembers: GroupMember[];
}

export interface GetUpcomingGroupSchedulesResponse {
  getUpcomingGroupSchedules: GroupSchedule[];
}

export interface GetAllGroupSchedulesResponse {
  getAllGroupSchedules: GroupSchedule[];
}

// Variables 타입들
export interface GetGroupsByAreaVariables {
  area: string;
}

export interface GetGroupInfoVariables {
  groupId: string;
}

export interface GetGroupMembersVariables {
  groupId: string;
}

export interface GetUpcomingGroupSchedulesVariables {
  groupId: string;
}

export interface GetAllGroupSchedulesVariables {
  groupId: string;
}

export interface CreateGroupVariables {
  groupCreateInput: GroupCreateInput;
}

export interface CreateGroupScheduleVariables {
  groupScheduleCreateRequestDto: GroupScheduleCreateInput;
}

export interface RequestJoinGroupVariables {
  groupJoinRequestDto: GroupJoinInput;
}

// 컨테이너에서 사용할 변환된 타입
export interface MeetingListItem {
  id: number;
  title: string;
  time: string;
  location: string;
  scheduleId?: string; // 실제 일정 ID (수정/삭제용)
}

export interface MeetingListProps {
  title: string;
  meetingList: MeetingListItem[];
  onEditSchedule?: (scheduleId: string) => void;
  onDeleteSchedule?: (scheduleId: string) => void;
  showActions?: boolean;
}
