import { gql, ApolloClient } from '@apollo/client';

export const GroupGQL = {
  QUERIES: {
    GET_GROUPS_BY_AREA: gql`
      query GetGroupsByArea($area: String!) {
        getGroupsByArea(area: $area) {
          groupId
          name
          description
          area {
            area
            latitude
            longitude
          }
          maxParticipation
          currentParticipation
          profile
          banner
          thirdPartyName
          createdAt
        }
      }
    `,
    GET_GROUP_INFO: gql`
      query GetGroupInfo($groupId: String!) {
        getGroupInfo(groupId: $groupId) {
          groupId
          name
          description
          area {
            area
            latitude
            longitude
          }
          maxParticipation
          currentParticipation
          profile
          banner
          thirdPartyName
          createdAt
        }
      }
    `,
    GET_GROUP_MEMBERS: gql`
      query GetGroupMembers($groupId: String!) {
        getGroupMembers(groupId: $groupId) {
          userId
          name
          email
          profile
          joinedAt
        }
      }
    `,
    GET_UPCOMING_GROUP_SCHEDULES: gql`
      query GetUpcomingGroupSchedules($groupId: String!) {
        getUpcomingGroupSchedules(groupId: $groupId) {
          scheduleId
          groupId
          groupName
          title
          description
          location
          scheduledAt
          durationMinutes
          file
          createdAt
          expense
        }
      }
    `,
    GET_ALL_GROUP_SCHEDULES: gql`
      query GetAllGroupSchedules($groupId: String!) {
        getAllGroupSchedules(groupId: $groupId) {
          scheduleId
          groupId
          groupName
          title
          description
          location
          scheduledAt
          durationMinutes
          file
          createdAt
          expense
        }
      }
    `,
    GET_PARTICIPATION_REQUESTS: gql`
      query GetParticipationRequests($groupId: String!) {
        getParticipationRequests(groupId: $groupId) {
          requestId
          requesterId
          requesterName
          groupId
          groupName
          requestMessage
          requestDate
        }
      }
    `,
    GET_MY_PARTICIPATION_REQUESTS: gql`
      query GetMyParticipationRequests {
        getMyParticipationRequests {
          requestId
          requesterId
          requesterName
          groupId
          groupName
          requestMessage
          requestDate
        }
      }
    `,
    GET_GROUP_STATUS: gql`
      query GetGroupStatus {
        getGroupStatus {
          groupId
          groupName
          hasGroup
        }
      }
    `,
    GET_AREAS: gql`
      query GetAreas {
        getAreas {
          area
          latitude
          longitude
        }
      }
    `,
    GET_GROUP_SCHEDULE_RECORDS: gql`
      query GetGroupScheduleRecords($scheduleId: String!) {
        getGroupScheduleRecords(scheduleId: $scheduleId) {
          recordId
          scheduleId
          scheduleTitle
          writerUserId
          writerName
          title
          content
          fileUrls
          createdAt
        }
      }
    `,
    GET_GROUP_SCHEDULE_PARTICIPANTS: gql`
      query GetGroupScheduleParticipants($scheduleId: String!) {
        getGroupScheduleParticipants(scheduleId: $scheduleId) {
          userId
          name
          profile
        }
      }
    `
  },
  MUTATIONS: {
    CREATE_GROUP: gql`
      mutation CreateGroup($groupCreateRequestDto: GroupCreateInput!) {
        createGroup(groupCreateRequestDto: $groupCreateRequestDto)
      }
    `,
    UPDATE_GROUP: gql`
      mutation UpdateGroup($groupUpdateRequestDto: GroupUpdateInput!) {
        updateGroup(groupUpdateRequestDto: $groupUpdateRequestDto)
      }
    `,
    DELETE_GROUP: gql`
      mutation DeleteGroup($groupId: String!) {
        deleteGroup(groupId: $groupId)
      }
    `,
    REMOVE_MEMBER: gql`
      mutation RemoveMember($groupId: String!, $memberUserId: String!) {
        removeMember(groupId: $groupId, memberUserId: $memberUserId)
      }
    `,
    CREATE_GROUP_SCHEDULE: gql`
      mutation CreateGroupSchedule($groupScheduleCreateRequestDto: GroupScheduleCreateInput!) {
        createGroupSchedule(groupScheduleCreateRequestDto: $groupScheduleCreateRequestDto) {
          scheduleId
          groupId
          groupName
          title
          description
          location
          scheduledAt
          durationMinutes
          file
          createdAt
        }
      }
    `,
    REQUEST_JOIN_GROUP: gql`
      mutation RequestJoinGroup($groupJoinRequestDto: GroupJoinInput!) {
        requestJoinGroup(groupJoinRequestDto: $groupJoinRequestDto)
      }
    `,
    APPROVE_PARTICIPATION_REQUEST: gql`
      mutation ApproveParticipationRequest($requestId: String!) {
        approveParticipationRequest(requestId: $requestId)
      }
    `,
    REJECT_PARTICIPATION_REQUEST: gql`
      mutation RejectParticipationRequest($requestId: String!) {
        rejectParticipationRequest(requestId: $requestId)
      }
    `,
    LEAVE_GROUP: gql`
      mutation LeaveGroup {
        leaveGroup
      }
    `,
    CREATE_GROUP_SCHEDULE_RECORD: gql`
      mutation AddScheduleRecord($groupScheduleRecordCreateRequestDto: GroupScheduleRecordCreateInput!) {
        addScheduleRecord(groupScheduleRecordCreateRequestDto: $groupScheduleRecordCreateRequestDto) {
          scheduleId
          title
          location
          scheduledAt
          file
        }
      }
    `,
    UPDATE_GROUP_SCHEDULE: gql`
      mutation UpdateGroupSchedule($groupScheduleUpdateRequestDto: GroupScheduleUpdateInput!) {
        updateGroupSchedule(groupScheduleUpdateRequestDto: $groupScheduleUpdateRequestDto) {
          scheduleId
          groupId
          groupName
          title
          description
          location
          scheduledAt
          durationMinutes
          file
          createdAt
        }
      }
    `,
    DELETE_GROUP_SCHEDULE: gql`
      mutation DeleteGroupSchedule($scheduleId: String!) {
        deleteGroupSchedule(scheduleId: $scheduleId)
      }
    `
  }
};

export const GroupService = {
  getGroupsByArea: async (client: ApolloClient<any>, area: string) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_GROUPS_BY_AREA,
      variables: { area }
    });
    return data.getGroupsByArea;
  },

  getGroupInfo: async (client: ApolloClient<any>, groupId: string) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_GROUP_INFO,
      variables: { groupId }
    });
    return data.getGroupInfo;
  },

  getGroupMembers: async (client: ApolloClient<any>, groupId: string) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_GROUP_MEMBERS,
      variables: { groupId }
    });
    return data.getGroupMembers;
  },

  getUpcomingSchedules: async (client: ApolloClient<any>, groupId: string) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_UPCOMING_GROUP_SCHEDULES,
      variables: { groupId },
      fetchPolicy: 'no-cache'
    });
    return data.getUpcomingGroupSchedules;
  },

  getAllSchedules: async (client: ApolloClient<any>, groupId: string) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_ALL_GROUP_SCHEDULES,
      variables: { groupId },
      fetchPolicy: 'no-cache'
    });
    return data.getAllGroupSchedules;
  },

  createGroup: async (client: ApolloClient<any>, groupInput: any) => {
    try {
      const { data } = await client.mutate({
        mutation: GroupGQL.MUTATIONS.CREATE_GROUP,
        variables: { groupCreateRequestDto: groupInput }
      });
      return data.createGroup;
    } catch (error) {
      throw error;
    }
  },

  updateGroup: async (client: ApolloClient<any>, groupUpdateInput: any) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.UPDATE_GROUP,
      variables: { groupUpdateRequestDto: groupUpdateInput }
    });
    return data.updateGroup;
  },

  deleteGroup: async (client: ApolloClient<any>, groupId: string) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.DELETE_GROUP,
      variables: { groupId },
      refetchQueries: ['GetGroupsByArea', 'GetGroupStatus'],
      awaitRefetchQueries: true
    });
    return data.deleteGroup;
  },

  removeMember: async (client: ApolloClient<any>, groupId: string, memberUserId: string) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.REMOVE_MEMBER,
      variables: { groupId, memberUserId }
    });
    return data.removeMember;
  },

  createSchedule: async (client: ApolloClient<any>, scheduleInput: any) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.CREATE_GROUP_SCHEDULE,
      variables: { groupScheduleCreateRequestDto: scheduleInput }
    });
    return data.createGroupSchedule;
  },

  requestJoinGroup: async (client: ApolloClient<any>, joinInput: any) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.REQUEST_JOIN_GROUP,
      variables: { groupJoinRequestDto: joinInput }
    });
    return data.requestJoinGroup;
  },

  approveParticipationRequest: async (client: ApolloClient<any>, requestId: string) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.APPROVE_PARTICIPATION_REQUEST,
      variables: { requestId }
    });
    return data.approveParticipationRequest;
  },

  rejectParticipationRequest: async (client: ApolloClient<any>, requestId: string) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.REJECT_PARTICIPATION_REQUEST,
      variables: { requestId }
    });
    return data.rejectParticipationRequest;
  },

  getParticipationRequests: async (client: ApolloClient<any>, groupId: string) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_PARTICIPATION_REQUESTS,
      variables: { groupId }
    });
    return data.getParticipationRequests;
  },

  getMyParticipationRequests: async (client: ApolloClient<any>) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_MY_PARTICIPATION_REQUESTS
    });
    return data.getMyParticipationRequests;
  },

  getGroupStatus: async (client: ApolloClient<any>) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_GROUP_STATUS,
      fetchPolicy: 'no-cache'
    });
    return data.getGroupStatus;
  },

  getAreas: async (client: ApolloClient<any>) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_AREAS
    });
    return data.getAreas;
  },

  getGroupScheduleRecords: async (client: ApolloClient<any>, scheduleId: string) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_GROUP_SCHEDULE_RECORDS,
      variables: { scheduleId },
      fetchPolicy: 'no-cache'
    });
    return data.getGroupScheduleRecords || [];
  },

  getGroupScheduleParticipants: async (client: ApolloClient<any>, scheduleId: string) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_GROUP_SCHEDULE_PARTICIPANTS,
      variables: { scheduleId },
      fetchPolicy: 'no-cache'
    });
    return data.getGroupScheduleParticipants;
  },

  leaveGroup: async (client: ApolloClient<any>) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.LEAVE_GROUP
    });
    return data.leaveGroup;
  },

  createGroupScheduleRecord: async (client: ApolloClient<any>, recordInput: any) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.CREATE_GROUP_SCHEDULE_RECORD,
      variables: { groupScheduleRecordCreateRequestDto: recordInput },
    });
    return data.addScheduleRecord;
  },

  updateGroupSchedule: async (client: ApolloClient<any>, updateInput: any) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.UPDATE_GROUP_SCHEDULE,
      variables: { groupScheduleUpdateRequestDto: updateInput },
      refetchQueries: ['GetAllGroupSchedules', 'GetGroupScheduleRecords'],
      awaitRefetchQueries: true
    });
    return data.updateGroupSchedule;
  },

  deleteGroupSchedule: async (client: ApolloClient<any>, scheduleId: string) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.DELETE_GROUP_SCHEDULE,
      variables: { scheduleId },
      refetchQueries: ['GetAllGroupSchedules'],
      awaitRefetchQueries: true
    });
    return data.deleteGroupSchedule;
  },
};
