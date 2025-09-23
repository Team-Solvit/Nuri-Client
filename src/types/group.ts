// Group 관련 타입들
export interface Area {
  area: string;
  latitude: number;
  longitude: number;
}

export interface Group {
  groupId: string;
  name: string;
  description: string;
  area: Area;
  maxParticipation: number;
  currentParticipation: number;
  profile?: string;
  banner?: string;
  thirdPartyName: string;
  createdAt: string;
}

export interface GroupMember {
  userId: string;
  name: string;
  email: string;
  profile?: string;
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
  expense?: number;
}

export interface GroupScheduleRecord {
  recordId: string;
  scheduleId: string;
  scheduleTitle: string;
  writerUserId: string;
  writerName: string;
  title: string;
  content: string;
  fileUrls?: string[];
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
  position: PositionInput;
  maxParticipation: number;
}

export interface GroupUpdateInput {
  groupId: string;
  name: string;
  banner?: string;
  description: string;
  profile?: string;
  positionDto: PositionInput;
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
  expense: number;
  durationMinutes?: number;
  file?: string;
}

export interface GroupScheduleRecordCreateInput {
  scheduleId: string;
  title: string;
  content?: string;
  fileUrl: string;
}

export interface GroupStatus {
  groupId?: string;
  groupName?: string;
  hasGroup: boolean;
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
  id: string;
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
