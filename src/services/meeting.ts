import {gql} from '@apollo/client';

export const MeetingQueries = {
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
		query GetPosts($groupId: Int!) {
		  posts(group_id: $groupId) {
		    id
		    picture
		  }
		}
	`,
	GET_MEETING_SCHEDULE: gql`
		query getAllGroupSchedules($groupId: String!) {
		  getAllGroupSchedules(groupId: $groupId) {
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
	`
}

export const MeetingMutations = {
	SIGNUP_MEETING: gql`
		mutation SignupMeeting($groupId: Int!) {
			signupMeeting(group_id: $groupId)
		}
	`,
		LEAVE_MEETING: gql`
	  mutation LeaveMeeting {
	    leaveMeeting
	  }
	`,
	JOIN_MEETING_REQUEST: gql`
		mutation requestJoinGroup($groupJoinInput : GroupJoinInput!){
			requestJoinGroup(groupJoinRequestDto : $groupJoinInput)
		}
	`
	
}