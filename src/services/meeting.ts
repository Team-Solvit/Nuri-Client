import {gql} from '@apollo/client';

export const MeetingQueries = {
	GET_MEETING_AREAS: gql`
		query GetMeetingAreas {
			areas {
		    id
		    name
		    lat
		    lng
		  }
		}
	`,
	GET_MEETINGS: gql`
		query GetMeetings($areaId: Int!) {
		  groups(area_id: $areaId) {
		    id
		    name
		    picture
		    description
		    current_population
		    max_population
		  }
		}
	`,
	GET_MEETING_INFO: gql`
		query GetGroup($groupId: Int!) {
		  group(group_id: $groupId) {
		    picture
		    name
		    area
		    description
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
		query GetSchedules($groupId: Int!) {
		  schedules(group_id: $groupId) {
		    day
		    day_of_week
		    expense
		    start_time
		    end_time
		    contents
		  }
		}
	`,
	GET_MEETING_MEMBER: gql`
		query GetMembers($groupId: Int!) {
		  members(group_id: $groupId) {
		    id
		    name
		    picture
		    post_count
		    follower_count
		    following_count
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
`
}