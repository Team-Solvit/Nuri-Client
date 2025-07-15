export interface AccessionProps {
	isAccession: boolean
	setIsAccession: (isAccession: boolean) => void
	accessions: Accession
}

export interface Accession {
	id: number;
	title: string;
	content: string;
	personnel: number;
	maxPersonnel: number;
}

