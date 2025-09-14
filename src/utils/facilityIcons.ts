export const FACILITY_ICON_MAP: { [key: string]: string } = {
  '침대': 'bed',
  '전신 거울': 'mirror',
  '전신거울': 'mirror',
  '화장대': 'mirror',
  
  '수납장': 'cabinet',
  '옷장': 'cabinet',

  '개별 냉장고': 'fridge',
  '개별냉장고': 'fridge',
  '냉장고': 'fridge'
};

export const getFacilityIcon = (name: string): string | undefined => {
  return FACILITY_ICON_MAP[name];
};
