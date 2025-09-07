import { gql, ApolloClient } from '@apollo/client';

export const GroupGQL = {
  QUERIES: {
    GET_GROUPS_BY_AREA: gql`
      query GetGroupsByArea($area: String!) {
        getGroupsByArea(area: $area) {
          groupId
          name
          description
          area
          maxParticipation
          currentParticipation
          profile
          banner
          latitude
          longitude
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
          area
          maxParticipation
          currentParticipation
          profile
          banner
          latitude
          longitude
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
        }
      }
    `
  },
  MUTATIONS: {
    CREATE_GROUP: gql`
      mutation CreateGroup($groupCreateInput: GroupCreateInput!) {
        createGroup(groupCreateInput: $groupCreateInput)
      }
    `,
    UPDATE_GROUP: gql`
      mutation UpdateGroup($groupUpdateInput: GroupUpdateInput!) {
        updateGroup(groupUpdateInput: $groupUpdateInput)
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
      variables: { groupId }
    });
    return data.getUpcomingGroupSchedules;
  },

  getAllSchedules: async (client: ApolloClient<any>, groupId: string) => {
    const { data } = await client.query({
      query: GroupGQL.QUERIES.GET_ALL_GROUP_SCHEDULES,
      variables: { groupId }
    });
    return data.getAllGroupSchedules;
  },

  createGroup: async (client: ApolloClient<any>, groupInput: any) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.CREATE_GROUP,
      variables: { groupCreateInput: groupInput }
    });
    return data.createGroup;
  },

  updateGroup: async (client: ApolloClient<any>, groupUpdateInput: any) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.UPDATE_GROUP,
      variables: { groupUpdateInput }
    });
    return data.updateGroup;
  },

  deleteGroup: async (client: ApolloClient<any>, groupId: string) => {
    const { data } = await client.mutate({
      mutation: GroupGQL.MUTATIONS.DELETE_GROUP,
      variables: { groupId }
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
  }
};
