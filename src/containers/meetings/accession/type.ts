export interface AccessionProps {
	isAccession: boolean
	setIsAccession: (isAccession: boolean) => void
	accessions: Accession
}

export interface Accession {
	groupId: string;
	name: string;
}

