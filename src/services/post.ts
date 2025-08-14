import {gql} from '@apollo/client';

export const PostMutations = {
	CREATE_MEETING_POST: gql`
		mutation UploadFile($file: String!, $title: String!, $contents: String!) {
			uploadFile(file: $file, title: $title, contents: $contents)
		}
	`
};