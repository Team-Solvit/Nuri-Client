export const FACILITY_ICON_MAP: { [key: string]: string } = {
  '침대': 'bed',
  '전신 거울': 'mirror',
  '전신거울': 'mirror',
  '화장대': 'mirror',
  
  '수납장': 'cabinet',
  '옷장': 'cabinet',

  '개별 냉장고': 'fridge',
  '개별냉장고': 'fridge',
  '냉장고': 'fridge',

  '커튼': 'curtain',

  '개별 화장실': 'toilet',
  '개별화장실': 'toilet',
  '화장실': 'toilet',

  '책상/의자': 'deskwithchair',

  '개인 세탁기': 'washing-machine',
  '개인세탁기': 'washing-machine',
  '세탁기': 'washing-machine',

  '개인 TV': 'tv',

  '전자레인지': 'microwave',

  '개별 에어컨': 'air-conditioner',
  '개별에어컨': 'air-conditioner',
  '에어컨': 'air-conditioner',

  '스탠드': 'stand',
};

export const getFacilityIcon = (name: string): string | undefined => {
  return FACILITY_ICON_MAP[name];
};
