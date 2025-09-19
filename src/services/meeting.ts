import {gql} from '@apollo/client';

export const MeetingQueries = {
	GET_MEETING_STATUS: gql`
		query {
		  getGroupStatus{
		    groupId
		    groupName
		    hasGroup
		  }
		}
	`,
	GET_MEETING_AREAS: gql`
		query {
		  getAreas{
		    area
		    longitude
		    latitude
		  }
		}
	`,
	GET_MEETINGS: gql`
		query MyQuery($area: String!) {
		  getGroupsByArea(area: $area) {
		    groupId
		    name
		    maxParticipation
		    currentParticipation
		    description
		    profile
		  }
		}
	`,
	GET_MEETING_INFO: gql`
		query getGroupInfo($groupId: String!) {
		  getGroupInfo(groupId: $groupId) {
		    groupId
		    name
		    description
		    maxParticipation
		    currentParticipation
		    profile
		    banner
		    area{
		      area
		    }
		    thirdPartyName
		    createdAt
		  }
		}	`,
	GET_MEETING_POST: gql`
		query getGroupPosts($groupId: String!) {
		  getGroupPosts(groupId: $groupId) {
		    postId
        thumbnail
		  }
		}
	`,
	GET_MEETING_SCHEDULE: gql`
		query getUpcomingGroupSchedules($groupId: String!) {
		  getUpcomingGroupSchedules(groupId: $groupId) {
		    scheduleId
		    title
		    description
		    location
		    scheduledAt
		    durationMinutes
		  }
		}
	`,
	GET_MEETING_MEMBER: gql`
		query getGroupMembers($groupId: String!) {
		  getGroupMembers(groupId: $groupId) {
		    userId
		    name
		    email
		  }
		}
	`,
	GET_IS_PARTICIPATING_GROUP_SCHEDULE: gql`
		query isParticipatingGroupSchedule($scheduleId: String!) {
		  isParticipatingGroupSchedule(scheduleId: $scheduleId)
		}
	`
}

export const MeetingMutations = {
	SIGNUP_MEETING: gql`
		mutation SignupMeeting($groupId: Int!) {
			signupMeeting(group_id: $groupId)
		}
	`,
		LEAVE_MEETING: gql`
	  mutation leaveGroup {
	    leaveGroup
	  }
	`,
	JOIN_MEETING_REQUEST: gql`
		mutation requestJoinGroup($groupJoinInput : GroupJoinInput!){
			requestJoinGroup(groupJoinRequestDto : $groupJoinInput)
		}
	`,
	JOIN_MEETING_SCHEDULE_REQUEST: gql`
	mutation joinGroupSchedule($scheduleId : String!){
			joinGroupSchedule(scheduleId : $scheduleId)
		}`,
	CANCEL_MEETING_REQUEST: gql`
		mutation cancelJoinGroupRequest($scheduleId : String!){
			cancelJoinGroupRequest(scheduleId : $scheduleId)
		}`,
	CANCEL_MEETING_SCHEDULE_REQUEST: gql`
		mutation cancelGroupScheduleParticipation($scheduleId : String!){
			cancelGroupScheduleParticipation(scheduleId : $scheduleId)
		}`,
}