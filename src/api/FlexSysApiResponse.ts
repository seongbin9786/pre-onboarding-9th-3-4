export interface FlexSysApiResponse {
  type: 'Flexsys Mock API';
  version: 1.0;
  response: {
    [key: string]: {
      id: '성북구' | '강남구' | '노원구' | '중랑구';
      value_area: number;
      value_bar: number;
    };
  };
}
